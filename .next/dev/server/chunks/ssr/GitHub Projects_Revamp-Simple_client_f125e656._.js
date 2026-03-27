module.exports = [
"[project]/GitHub Projects/Revamp-Simple/client/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Authenticated fetch utility
__turbopack_context__.s([
    "authFetch",
    ()=>authFetch,
    "getAllNames",
    ()=>getAllNames,
    "getCareerPath",
    ()=>getCareerPath,
    "getDailyQuest",
    ()=>getDailyQuest,
    "getFanFeud",
    ()=>getFanFeud
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/lib/auth-context.tsx [app-ssr] (ecmascript)");
;
async function authFetch(path, options = {}) {
    // This must be called inside a React component or hook
    const { accessToken, refreshToken, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    let token = accessToken;
    // If token is expired, try to refresh
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const headers = options.headers ? {
        ...options.headers
    } : {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return fetch(path, {
        ...options,
        headers,
        credentials: 'same-origin'
    });
}
async function doGet(path) {
    try {
        const res = await fetch(path, {
            credentials: "same-origin"
        });
        if (res.status === 404) return null;
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `Request failed: ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        throw err;
    }
}
async function getDailyQuest() {
    return doGet("/api/questions/today");
}
async function getFanFeud() {
    return doGet("/api/fanfeud/today");
}
async function getCareerPath() {
    return doGet("/api/careerpath/today");
}
async function getAllNames(table) {
    const res = await doGet(`/api/allnames?db=${encodeURIComponent(table)}`);
    return res || [];
}
}),
"[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FanFeudModal",
    ()=>FanFeudModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function FanFeudModal({ question, answersDb, onSubmit, shake, allAnswers, incorrectGuesses = 0, readOnly = false }) {
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [allNames, setAllNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (allAnswers && allAnswers.length > 0) {
            setAllNames(allAnswers);
            return;
        }
        // Fetch all names once on mount
        ;
        (async ()=>{
            try {
                const names = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllNames"])(answersDb);
                setAllNames(names);
            } catch (err) {
                console.error("All names fetch error:", err);
                setAllNames([]);
            }
        })();
    }, [
        answersDb,
        allAnswers
    ]);
    function normalize(str) {
        return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }
        const normalizedInput = normalize(input.trim());
        const filtered = allNames.filter((name)=>normalize(name).includes(normalizedInput)).slice(0, 10);
        setSuggestions(filtered);
    }, [
        input,
        allNames
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            className: `relative mx-auto z-[9999] w-full max-w-2xl ${shake ? "animate-shake" : ""}`,
            initial: {
                opacity: 0,
                y: -50
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: -50
            },
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "bg-gradient-to-br from-[#082644] to-[#152a4d] rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-sm",
                whileHover: {
                    scale: 1.02
                },
                transition: {
                    duration: 0.2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 sm:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl sm:text-3xl font-black text-center text-white mb-6 drop-shadow-lg",
                            children: question
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, this),
                        !readOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "answer",
                                            type: "text",
                                            placeholder: "Type your answer...",
                                            value: input,
                                            onChange: (e)=>setInput(e.target.value),
                                            className: "w-full p-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:outline-none focus:border-[#2eaafd] focus:ring-4 focus:ring-[#2eaafd]/20 text-white text-lg placeholder-white/50 font-semibold transition-all duration-300",
                                            autoFocus: true,
                                            autoComplete: "off"
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                            lineNumber: 81,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                        lineNumber: 80,
                                        columnNumber: 19
                                    }, this),
                                    suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        className: "absolute left-0 top-full w-full mt-2 bg-[#082644] border-2 border-white/20 rounded-2xl shadow-2xl z-[10000] max-h-60 overflow-y-auto",
                                        children: suggestions.map((name, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: -20
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    delay: idx * 0.05
                                                },
                                                className: "py-3 px-5 cursor-pointer hover:bg-[#2eaafd]/30 transition-colors border-b border-white/10 last:border-b-0 text-white text-lg font-medium first:rounded-t-2xl last:rounded-b-2xl",
                                                onClick: ()=>{
                                                    onSubmit(name);
                                                    setInput("");
                                                },
                                                children: name
                                            }, name, false, {
                                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                                lineNumber: 100,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                        lineNumber: 94,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                lineNumber: 79,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-3 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/80 font-bold text-lg mr-2",
                                    children: "Lives:"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                Array.from({
                                    length: 3
                                }).map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            scale: 0
                                        },
                                        animate: {
                                            scale: 1
                                        },
                                        transition: {
                                            delay: idx * 0.1,
                                            type: "spring",
                                            stiffness: 500
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/logo-circle.svg",
                                            alt: "Life",
                                            width: 32,
                                            height: 32,
                                            style: {
                                                opacity: idx < 3 - incorrectGuesses ? 1 : 0.2,
                                                filter: idx < 3 - incorrectGuesses ? "drop-shadow(0 0 8px rgba(46, 170, 253, 0.5))" : "grayscale(1) brightness(0.4)",
                                                transition: "all 0.3s"
                                            },
                                            draggable: false
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                            lineNumber: 129,
                                            columnNumber: 19
                                        }, this)
                                    }, idx, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
}),
"[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FanFeudCompleteModal",
    ()=>FanFeudCompleteModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function FanFeudCompleteModal({ correctCount, totalCount, onClose }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.body.style.overflow = "hidden";
        return ()=>{
            document.body.style.overflow = "unset";
        };
    }, []);
    const getScoreMessage = ()=>{
        if (totalCount === 0) return "Nice Try!";
        const pct = correctCount / totalCount;
        if (pct === 1) return "Perfect Score! 🎉";
        if (pct >= 0.8) return "Excellent Work! 🌟";
        if (pct >= 0.6) return "Good Job! 👏";
        if (pct >= 0.4) return "Not Bad! 💪";
        return "Keep Practicing! 📚";
    };
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            onClick: onClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "relative rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden",
                style: {
                    backgroundColor: "#082644"
                },
                initial: {
                    scale: 0.8,
                    opacity: 0,
                    y: 50
                },
                animate: {
                    scale: 1,
                    opacity: 1,
                    y: 0
                },
                exit: {
                    scale: 0.8,
                    opacity: 0,
                    y: 50
                },
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                },
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2eaafd]/20 to-transparent rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#2a569c]/20 to-transparent rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative p-8 md:p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scale: 0,
                                    rotate: -180
                                },
                                animate: {
                                    scale: 1,
                                    rotate: 0
                                },
                                transition: {
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200
                                },
                                className: "flex justify-center mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "80",
                                            height: "80",
                                            viewBox: "0 0 1639.16 1372.8",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            role: "img",
                                            "aria-label": "trophy",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                                        children: `.cls-1{fill:#7bc143}.cls-1,.cls-2,.cls-3,.cls-4{stroke-width:0px}.cls-2{fill:#f0efef}.cls-3{fill:#fff}.cls-4{fill:#1958a4}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    className: "cls-2",
                                                    cx: "641.59",
                                                    cy: "647.38",
                                                    r: "31.54"
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            className: "cls-4",
                                                            d: "M895.84,1066.31c64.45-14.07,127.88-31.54,189.36-52.18l-155.38,358.66h-261.23l-112.57-259.85c109.09-5.51,223.13-21.14,339.82-46.64Z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            className: "cls-4",
                                                            d: "M1597.06,0l-161.3,204.85-56.5,130.44-2.5,5.77-46.52,107.41-155.26,358.4c-95.58,44.34-204.05,80.38-314.62,104.53-128.58,28.06-257.46,43.02-372.89,43.28l-133.38-307.93h-.03l-48.2-111.33L162.64,204.85,1.34,0l511.16,175.58,203.82,413.76c-135-118.93-400.86-270.04-400.86-270.04l174.93,214.59c-39.66,113.8,27.97,244.54,151.52,223.07,81.5-14.16,100.46-70.81,103.94-107.68l53.35,108.33,53.35-108.33c3.47,36.86,22.44,93.52,103.94,107.68,123.55,21.47,191.18-109.27,151.52-223.07l174.93-214.59s-265.86,151.11-400.86,270.04l203.82-413.76L1597.06,0Z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                            lineNumber: 78,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "cls-2",
                                                            cx: "956.82",
                                                            cy: "647.38",
                                                            r: "31.54"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                            lineNumber: 79,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                    className: "cls-1",
                                                    points: "305.86 535.42 354.09 646.75 354.06 646.75 305.86 535.42"
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                    className: "cls-1",
                                                    points: "1376.76 341.06 1330.24 448.47 1330.21 448.47 1376.76 341.06"
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    className: "cls-3",
                                                    d: "M1637.11,516.34c-14.75-76.85-102.73-123.34-236.15-142.28l-21.38,49.32c86.15,19.43,139.13,53.94,145.66,94.9,7.8,48.79-20.58,121.34-152.55,215.65-50.62,36.19-108.09,69.52-170.63,99.26-100.85,48.02-214.83,86.66-334.17,112.71-132.21,28.86-264.85,44.11-383.6,44.11-6.8,0-13.49-.03-20.08-.15-236.82-2.97-347-59.07-360.55-121.05-11.63-53.41,37.95-134.21,149.84-204.73,17.49-11.01,36.01-21.97,55.41-32.71l-20.55-47.44C94.83,682.38-19.62,799.51,2.78,902.18c25.97,118.9,227.22,183.06,500.23,177.32,117.84-2.47,249.04-17.96,385.28-47.7,93.25-20.35,181.23-47.32,261.85-78.76,310.14-120.87,511.72-307.67,486.96-436.69Z"
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this),
                                        correctCount === totalCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            animate: {
                                                rotate: 360
                                            },
                                            transition: {
                                                duration: 2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "linear"
                                            },
                                            className: "absolute -top-2 -right-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                size: 32,
                                                className: "text-yellow-400 fill-yellow-400"
                                            }, void 0, false, {
                                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                                lineNumber: 92,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                            lineNumber: 87,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].h2, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.3
                                },
                                className: "text-3xl md:text-4xl font-bold text-white mb-4",
                                children: "Fan Feud Complete!"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.5
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    delay: 0.4,
                                    type: "spring"
                                },
                                className: "mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white px-8 py-4 rounded-2xl shadow-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-5xl font-bold",
                                            children: correctCount
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl font-semibold",
                                            children: [
                                                "/",
                                                totalCount
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                            lineNumber: 117,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 0.5
                                },
                                className: "text-xl font-semibold text-white mb-2",
                                children: getScoreMessage()
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                transition: {
                                    delay: 0.6
                                },
                                className: "text-white/70 mb-8",
                                children: "Come back tomorrow to play again!"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.7
                                },
                                onClick: onClose,
                                className: "px-8 py-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this), document.body);
}
}),
"[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FanFeud
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/components/navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$fan$2d$feud$2f$fan$2d$feud$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$fan$2d$feud$2f$fan$2d$feud$2d$complete$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/components/fan-feud/fan-feud-complete-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/lib/auth-context.tsx [app-ssr] (ecmascript)");
"use client";
;
// Utility to check if user is logged in (based on localStorage 'user' or 'accessToken')
function isUserLoggedIn() {
    if ("TURBOPACK compile-time truthy", 1) return false;
    //TURBOPACK unreachable
    ;
}
;
;
;
;
;
;
;
const today = new Date().toISOString().split("T")[0];
// Fan Feud data is loaded from the server at runtime
// Answer slot images (1-8)
const answerImages = [
    "/number-1-badge.jpg",
    "/number-2-badge.jpg",
    "/number-3-badge.jpg",
    "/number-4-badge.jpg",
    "/number-5-badge.jpg",
    "/number-6-badge.jpg",
    "/number-7-badge.jpg",
    "/number-8-badge.jpg"
];
function FanFeud() {
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [answersDb, setAnswersDb] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [allAnswers, setAllAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCompleteModal, setShowCompleteModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [revealedAnswers, setRevealedAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Array(8).fill(false));
    const [incorrectGuesses, setIncorrectGuesses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [gameComplete, setGameComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [didWin, setDidWin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [initialized, setInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gridScale, setGridScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [shake, setShake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Storage key for guest progress
    const getStorageKey = ()=>`fanfeud_progress_guest_${today}`;
    // Load progress from localStorage (for guests)
    const loadProgressFromStorage = ()=>{
        const storageKey = getStorageKey();
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setRevealedAnswers(parsed.revealedAnswers || Array(8).fill(false));
                setIncorrectGuesses(parsed.incorrectGuesses ?? 0);
                setGameComplete(parsed.gameComplete ?? false);
                setDidWin(parsed.didWin ?? false);
                // If the game was already completed (lost or won), show the complete modal on load
                if (parsed.gameComplete) {
                    setShowCompleteModal(true);
                    // keep the question modal hidden on load when completed
                    setShowModal(false);
                } else {
                    setShowCompleteModal(false);
                    setShowModal(true);
                }
            } catch  {
                console.warn("Invalid saved data. Resetting.");
                setRevealedAnswers(Array(8).fill(false));
                setIncorrectGuesses(0);
                setGameComplete(false);
                setDidWin(false);
                setShowCompleteModal(false);
                setShowModal(true);
            }
        } else {
            // no saved progress -> start with question modal open
            setShowCompleteModal(false);
            setShowModal(true);
        }
    };
    // Save progress to localStorage (for guests only)
    const saveProgressToStorage = ()=>{
        if (!isUserLoggedIn()) {
            const storageKey = getStorageKey();
            const toStore = {
                revealedAnswers,
                incorrectGuesses,
                gameComplete,
                didWin
            };
            localStorage.setItem(storageKey, JSON.stringify(toStore));
        }
    };
    // Try persisting progress to server (authenticated users)
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const saveProgressToServer = async ()=>{
        if (!isAuthenticated) return;
        try {
            const score = revealedAnswers.filter(Boolean).length;
            const totalAnswers = answers.length;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/scores/fan-feud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    progress: {
                        revealedAnswers
                    },
                    score,
                    totalAnswers,
                    completed: gameComplete,
                    incorrectGuesses
                })
            });
        } catch (e) {
        // ignore failures
        }
    };
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            setStatus("loading");
            setErrorMsg("");
            // Fetch from API
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFanFeud"])();
            if (!data) {
                setStatus("empty");
                return;
            }
            setQuestion(data.question);
            setAnswersDb(data.answersDb);
            // Map server shape (answerText) to client shape (answer)
            const mappedAnswers = (data.answers || []).map((a)=>({
                    id: a.id,
                    answer: a.answerText ?? a.answer ?? "",
                    rank: a.rank
                }));
            setAnswers(mappedAnswers);
            // don't preload the full allNames list here; let the modal fetch it when needed
            setAllAnswers([]);
            if (isAuthenticated) {
                // Clear guest progress on login
                const storageKey = getStorageKey();
                localStorage.removeItem(storageKey);
                // Try loading progress from server
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authFetch"])('/api/scores/load', {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (res.ok) {
                        const json = await res.json();
                        const serverData = json?.data;
                        if (serverData && serverData.fanFeudProgress) {
                            const prog = serverData.fanFeudProgress;
                            setRevealedAnswers(prog.revealedAnswers || Array(8).fill(false));
                            setIncorrectGuesses(serverData.fanFeudIncorrectGuesses || 0);
                            setGameComplete(serverData.fanFeudCompleted || false);
                            setDidWin((serverData.fanFeudScore || 0) >= (serverData.fanFeudTotalAnswers || 0));
                            if (serverData.fanFeudCompleted) {
                                setShowCompleteModal(true);
                                setShowModal(false);
                            } else {
                                setShowCompleteModal(false);
                                setShowModal(true);
                            }
                            setInitialized(true);
                            setStatus("ready");
                            return;
                        }
                    }
                } catch (e) {
                // If server fails, treat as not logged in (do not fallback to localStorage)
                }
                // If logged in but no server data, start fresh
                setRevealedAnswers(Array(8).fill(false));
                setIncorrectGuesses(0);
                setGameComplete(false);
                setDidWin(false);
                setShowCompleteModal(false);
                setShowModal(true);
                setInitialized(true);
                setStatus("ready");
                return;
            } else {
                // fallback to localStorage for guests
                loadProgressFromStorage();
            }
            setInitialized(true);
            setStatus("ready");
        // `loadProgressFromStorage` will decide whether to open the question modal or the complete modal
        } catch (e) {
            setStatus("error");
            setErrorMsg(e?.message || "Network error");
            setShowModal(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        load();
    }, [
        load
    ]);
    // Save progress whenever state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!initialized) return;
        if (isUserLoggedIn()) {
            // Only persist to server
            saveProgressToServer();
        } else {
            // Only persist to localStorage
            saveProgressToStorage();
        }
    }, [
        revealedAnswers,
        incorrectGuesses,
        gameComplete,
        didWin,
        initialized
    ]);
    // Handle responsive scaling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onResize = ()=>{
            const gridNaturalWidth = 2 * 264 + 24 + 48;
            const maxGridWidth = window.innerWidth * 0.9;
            const scale = Math.min(1, maxGridWidth / gridNaturalWidth);
            setGridScale(scale);
        };
        onResize();
        window.addEventListener("resize", onResize);
        return ()=>window.removeEventListener("resize", onResize);
    }, []);
    const handleGuess = (guess)=>{
        const normalizedGuess = guess.trim().toLowerCase();
        const matched = answers.find((ans)=>(ans.answer ?? "").trim().toLowerCase() === normalizedGuess);
        if (matched) {
            setRevealedAnswers((prev)=>{
                const updated = [
                    ...prev
                ];
                updated[matched.rank - 1] = true;
                const allRevealed = updated.every((val, i)=>{
                    const hasAnswer = answers.some((a)=>a.rank === i + 1);
                    return !hasAnswer || val;
                });
                if (allRevealed) {
                    setGameComplete(true);
                    setDidWin(true);
                    setShowCompleteModal(true);
                }
                return updated;
            });
        } else {
            setShake(true);
            setTimeout(()=>setShake(false), 500);
            setIncorrectGuesses((prev)=>{
                const newCount = prev + 1;
                if (newCount >= 3) {
                    setGameComplete(true);
                    setDidWin(false);
                    setShowCompleteModal(true);
                }
                return newCount;
            });
        }
    };
    if (status === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                    lineNumber: 279,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center min-h-screen w-full pt-16",
                    style: {
                        backgroundColor: "#2eaafd"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "p-6 text-lg text-white font-semibold",
                        children: "Loading Fan Feud…"
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                        lineNumber: 284,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    if (status === "empty") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen w-full flex items-center justify-center px-4 pt-16",
                    style: {
                        backgroundColor: "#2eaafd"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-md border-4 border-[#152a4d]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold mb-4 text-[#152a4d]",
                                children: "No Fan Feud Yet"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-700",
                                children: [
                                    "There isn't a Fan Feud published for today (",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono font-semibold",
                                        children: today
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 59
                                    }, this),
                                    ") yet. Check back later!"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    if (status === "error") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                    lineNumber: 313,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen w-full flex items-center justify-center px-4 pt-16",
                    style: {
                        backgroundColor: "#2eaafd"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl shadow-xl p-8 text-center w-full max-w-md border-4 border-[#152a4d]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold mb-4 text-[#152a4d]",
                                children: "Something Went Wrong"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-600 break-words",
                                children: errorMsg
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "relative flex flex-col items-center justify-start min-h-screen w-full overflow-y-auto px-4 sm:px-8 pt-28 pb-20",
                style: {
                    backgroundColor: "#2eaafd"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-6xl flex flex-col items-center relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.6
                            },
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl sm:text-5xl font-black text-white mb-2 drop-shadow-lg",
                                    children: "Fan Feud"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl sm:text-2xl text-white/90 font-semibold",
                                    children: "Guess all answers on the board to win!"
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, this),
                        showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full flex justify-center mb-8 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$fan$2d$feud$2f$fan$2d$feud$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FanFeudModal"], {
                                question: question,
                                answersDb: answersDb,
                                onSubmit: handleGuess,
                                shake: shake,
                                allAnswers: allAnswers,
                                incorrectGuesses: incorrectGuesses,
                                readOnly: gameComplete && !didWin
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                lineNumber: 350,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                            lineNumber: 349,
                            columnNumber: 13
                        }, this),
                        showCompleteModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full flex justify-center mb-8 z-50 relative",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$fan$2d$feud$2f$fan$2d$feud$2d$complete$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FanFeudCompleteModal"], {
                                correctCount: revealedAnswers.filter(Boolean).length,
                                totalCount: answers.length,
                                onClose: ()=>{
                                    // If the user won, just close the complete modal; if they lost, re-open the question modal in read-only mode
                                    setShowCompleteModal(false);
                                    if (!didWin) setShowModal(true);
                                }
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                lineNumber: 365,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                            lineNumber: 364,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-full ${shake ? "animate-shake" : ""}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto",
                                children: Array.from({
                                    length: 8
                                }).map((_, i)=>{
                                    const answer = answers.find((a)=>a.rank === i + 1);
                                    const isRevealed = revealedAnswers[i];
                                    const shouldReveal = isRevealed || gameComplete && !didWin && answer;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.9
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        transition: {
                                            delay: i * 0.1,
                                            duration: 0.4
                                        },
                                        style: {
                                            perspective: "1000px"
                                        },
                                        className: "aspect-[3/2]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: false,
                                            animate: {
                                                rotateY: shouldReveal ? 180 : 0
                                            },
                                            transition: {
                                                duration: 0.8,
                                                ease: [
                                                    0.34,
                                                    1.56,
                                                    0.64,
                                                    1
                                                ]
                                            },
                                            style: {
                                                width: "100%",
                                                height: "100%",
                                                position: "relative",
                                                transformStyle: "preserve-3d"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 flex flex-col items-center justify-center rounded-2xl shadow-2xl border-4 border-[#152a4d] overflow-hidden group hover:scale-105 transition-transform duration-300",
                                                    style: {
                                                        backgroundColor: "#082644",
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden"
                                                    },
                                                    children: answer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-gradient-to-br from-[#2a569c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            }, void 0, false, {
                                                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                                lineNumber: 420,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-8xl sm:text-9xl font-black text-white/10 absolute",
                                                                children: i + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-6xl sm:text-7xl font-black text-white relative z-10",
                                                                children: i + 1
                                                            }, void 0, false, {
                                                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                                lineNumber: 422,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute inset-0 flex items-center justify-center rounded-2xl shadow-2xl border-4 border-[#152a4d] px-4 text-center overflow-hidden",
                                                    style: {
                                                        backgroundColor: isRevealed ? "#152a4d" : "#082644",
                                                        backfaceVisibility: "hidden",
                                                        WebkitBackfaceVisibility: "hidden",
                                                        transform: "rotateY(180deg)"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative z-10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-4xl sm:text-5xl font-black mb-2",
                                                                    style: {
                                                                        color: !isRevealed && gameComplete && !didWin ? "#f06d6f" : "#2eaafd"
                                                                    },
                                                                    children: i + 1
                                                                }, void 0, false, {
                                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                                    lineNumber: 438,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold leading-tight",
                                                                    style: {
                                                                        fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                                                                        color: !isRevealed && gameComplete && !didWin ? "#f06d6f" : "#fff"
                                                                    },
                                                                    children: answer?.answer
                                                                }, void 0, false, {
                                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                                    lineNumber: 446,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 25
                                                        }, this),
                                                        isRevealed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 bg-gradient-to-br from-[#2eaafd]/10 to-transparent"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 21
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                        lineNumber: 385,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                                lineNumber: 378,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                            lineNumber: 377,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                    lineNumber: 335,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/fanfeud/page.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=GitHub%20Projects_Revamp-Simple_client_f125e656._.js.map