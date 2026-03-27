// Authenticated fetch utility
import { useAuth } from '@/lib/auth-context'

export async function authFetch(path: string, options: RequestInit = {}) {
  // This must be called inside a React component or hook
  const { accessToken, refreshToken, logout } = useAuth();
  let token = accessToken;
  // If token is expired, try to refresh
  if (token && typeof window !== 'undefined') {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    if (decoded.exp && Date.now() / 1000 > decoded.exp) {
      const refreshed = await refreshToken();
      if (!refreshed) {
        logout();
        throw new Error('Session expired');
      }
      token = localStorage.getItem('accessToken');
    }
  }
  const headers = options.headers ? { ...options.headers } : {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetch(path, { ...options, headers, credentials: 'same-origin' });
}
export type DailyQuestion = { id: number; text: string; answer: string; answers_db: string }
export type FanFeudAnswer = { id: number; answer: string; rank: number }
export type FanFeudResponse = { question: string; answers: FanFeudAnswer[]; answersDb: string }
export type CareerPathTeam = { id: number; league: string; name: string; logo_url: string; order_index: number; years?: string | null }
export type CareerPathResponse = { player_name: string; answers_table: string; teams: CareerPathTeam[] }

async function doGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(path, { credentials: "same-origin" })
    if (res.status === 404) return null
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || `Request failed: ${res.status}`)
    }
    return (await res.json()) as T
  } catch (err) {
    throw err
  }
}

export async function getDailyQuest(): Promise<DailyQuestion[] | null> {
  return doGet<DailyQuestion[]>("/api/questions/today")
}

export async function getFanFeud(): Promise<FanFeudResponse | null> {
  return doGet<FanFeudResponse>("/api/fanfeud/today")
}

export async function getCareerPath(): Promise<CareerPathResponse | null> {
  return doGet<CareerPathResponse>("/api/careerpath/today")
}

export async function getAllNames(table: string): Promise<string[]> {
  const res = await doGet<string[]>(`/api/allnames?db=${encodeURIComponent(table)}`)
  return res || []
}
