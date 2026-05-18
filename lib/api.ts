const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

function buildUrl(path: string) {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
  }

  if (path.startsWith("/")) {
    return `${API_BASE}${path}`;
  }

  return `${API_BASE}/${path}`;
}

// Utility to decode JWT and check expiry
function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return true;
  return Date.now() / 1000 > decoded.exp;
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(buildUrl("/auth/refresh"), {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      return null;
    }

    const data = await res.json();

    if (!data.accessToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      return null;
    }

    localStorage.setItem("accessToken", data.accessToken);

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data.accessToken;
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    return null;
  }
}

export async function authFetch(path: string, options: RequestInit = {}) {
  let token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (token && isTokenExpired(token)) {
    token = await refreshAccessToken();

    if (!token) {
      throw new Error("Session expired");
    }
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(buildUrl(path), {
    ...options,
    headers,
    credentials: "include",
  });
}

export type DailyQuestion = {
  id: number;
  text: string;
  answer: string;
  answers_db: string;
};

export type FanFeudAnswer = {
  id: number;
  answer: string;
  rank: number;
};

export type FanFeudResponse = {
  question: string;
  answers: FanFeudAnswer[];
  answersDb: string;
};

export type CareerPathTeam = {
  id: number;
  league: string;
  name: string;
  logo_url: string;
  order_index: number;
  years?: string | null;
};

export type CareerPathResponse = {
  player_name: string;
  answers_table: string;
  teams: CareerPathTeam[];
};

async function doGet<T>(path: string): Promise<T | null> {
  const res = await fetch(buildUrl(path), {
    credentials: "include",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function getDailyQuest(): Promise<DailyQuestion[] | null> {
  return doGet<DailyQuestion[]>("/api/questions/today");
}

export async function getFanFeud(): Promise<FanFeudResponse | null> {
  return doGet<FanFeudResponse>("/api/fanfeud/today");
}

export async function getCareerPath(): Promise<CareerPathResponse | null> {
  return doGet<CareerPathResponse>("/api/careerpath/today");
}

export async function getAllNames(table: string): Promise<string[]> {
  const res = await doGet<string[]>(
    `/api/allnames?db=${encodeURIComponent(table)}`
  );
  return res || [];
}

// ─── Article types ────────────────────────────────────────────────────────────

export type ArticleBlock = {
  id: string;
  type: "paragraph" | "header" | "image";
  content?: string;
  url?: string;
  caption?: string;
  alt?: string;
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  authorId?: number | null;
  status: "draft" | "published";
  seoTitle?: string | null;
  seoDesc?: string | null;
  blocks: ArticleBlock[];
  createdAt: string;
  updatedAt: string;
};

export type ArticleListItem = {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  status: "draft" | "published";
  seoDesc?: string | null;
  blocks?: ArticleBlock[];
  createdAt: string;
  updatedAt: string;
};

// ─── Public article API ───────────────────────────────────────────────────────

export async function getPublishedArticles(
  page = 1,
  limit = 20
): Promise<{ articles: ArticleListItem[]; total: number }> {
  const res = await fetch(
    buildUrl(`/api/articles?page=${page}&limit=${limit}`),
    { credentials: "include" }
  );
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await fetch(buildUrl(`/api/articles/${slug}`), {
    credentials: "include",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
}

// ─── Admin article API ────────────────────────────────────────────────────────

export async function adminGetAllArticles(): Promise<{
  articles: ArticleListItem[];
}> {
  const res = await authFetch("/api/admin/articles");
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export async function adminGetArticle(id: number): Promise<Article> {
  const res = await authFetch(`/api/admin/articles/${id}`);
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
}

export async function adminCreateArticle(data: {
  title: string;
  authorName: string;
  status: "draft" | "published";
  blocks: ArticleBlock[];
  seoTitle?: string;
  seoDesc?: string | null;
}): Promise<Article> {
  const res = await authFetch("/api/admin/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error || "Failed to create article");
  }
  return res.json();
}

export async function adminUpdateArticle(
  id: number,
  data: {
    title?: string;
    authorName?: string;
    status?: "draft" | "published";
    blocks?: ArticleBlock[];
    seoTitle?: string | null;
    seoDesc?: string | null;
  }
): Promise<Article> {
  const res = await authFetch(`/api/admin/articles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error || "Failed to update article");
  }
  return res.json();
}

export async function adminUpdateArticleStatus(
  id: number,
  status: "draft" | "published"
): Promise<{ id: number; status: string; slug: string }> {
  const res = await authFetch(`/api/admin/articles/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(err.error || "Failed to update status");
  }
  return res.json();
}

export async function adminDeleteArticle(id: number): Promise<void> {
  const res = await authFetch(`/api/admin/articles/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete article");
}