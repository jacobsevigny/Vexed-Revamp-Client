(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/career-path/career-path-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CareerPathModal",
    ()=>CareerPathModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
}
function CareerPathModal({ answersDb, allNames = [], onSubmit, shake, incorrectGuesses = 0, readOnly = false, playerName }) {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CareerPathModal.useEffect": ()=>{
            if (!input.trim() || !allNames.length) {
                setSuggestions([]);
                return;
            }
            const normalizedInput = normalize(input.trim());
            const filtered = allNames.filter({
                "CareerPathModal.useEffect.filtered": (name)=>normalize(name).includes(normalizedInput)
            }["CareerPathModal.useEffect.filtered"]).slice(0, 10);
            setSuggestions(filtered);
        }
    }["CareerPathModal.useEffect"], [
        input,
        allNames
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: `w-full max-w-2xl relative z-40 ${shake ? "animate-shake" : ""}`,
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "bg-gradient-to-br from-[#082644] to-[#152a4d] rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-sm",
                whileHover: {
                    scale: 1.02
                },
                transition: {
                    duration: 0.2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 sm:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl sm:text-3xl font-black text-center text-white mb-6 drop-shadow-lg",
                            children: "Whose career path is this?"
                        }, void 0, false, {
                            fileName: "[project]/components/career-path/career-path-modal.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        !readOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-[1100]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        name: "answer",
                                        type: "text",
                                        placeholder: "Type your answer...",
                                        value: input,
                                        onChange: (e)=>setInput(e.target.value),
                                        className: "w-full p-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:outline-none focus:border-[#2eaafd] focus:ring-4 focus:ring-[#2eaafd]/20 text-white text-lg placeholder-white/50 font-semibold transition-all duration-300",
                                        autoFocus: true,
                                        autoComplete: "off"
                                    }, void 0, false, {
                                        fileName: "[project]/components/career-path/career-path-modal.tsx",
                                        lineNumber: 63,
                                        columnNumber: 19
                                    }, this),
                                    suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        className: "absolute left-0 top-full w-full mt-2 bg-[#082644] border-2 border-white/20 rounded-2xl shadow-2xl z-30 max-h-60 overflow-y-auto",
                                        children: suggestions.map((name, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                                fileName: "[project]/components/career-path/career-path-modal.tsx",
                                                lineNumber: 81,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/career-path/career-path-modal.tsx",
                                        lineNumber: 75,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/career-path/career-path-modal.tsx",
                                lineNumber: 62,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/career-path/career-path-modal.tsx",
                            lineNumber: 61,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white text-lg font-semibold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/80",
                                        children: "Correct Player: "
                                    }, void 0, false, {
                                        fileName: "[project]/components/career-path/career-path-modal.tsx",
                                        lineNumber: 102,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-white",
                                        children: playerName ?? "Unknown Player"
                                    }, void 0, false, {
                                        fileName: "[project]/components/career-path/career-path-modal.tsx",
                                        lineNumber: 103,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/career-path/career-path-modal.tsx",
                                lineNumber: 101,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/career-path/career-path-modal.tsx",
                            lineNumber: 100,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-3 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/80 font-bold text-lg mr-2",
                                    children: "Lives:"
                                }, void 0, false, {
                                    fileName: "[project]/components/career-path/career-path-modal.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                Array.from({
                                    length: 3
                                }).map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                                            fileName: "[project]/components/career-path/career-path-modal.tsx",
                                            lineNumber: 117,
                                            columnNumber: 19
                                        }, this)
                                    }, idx, false, {
                                        fileName: "[project]/components/career-path/career-path-modal.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/career-path/career-path-modal.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/career-path/career-path-modal.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/career-path/career-path-modal.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/career-path/career-path-modal.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/career-path/career-path-modal.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(CareerPathModal, "CVmNJta3gfRlwOpGGp2E4nOnias=");
_c = CareerPathModal;
var _c;
__turbopack_context__.k.register(_c, "CareerPathModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/career-path/career-path-complete-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CareerPathCompleteModal",
    ()=>CareerPathCompleteModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CareerPathCompleteModal({ onClose, gameOver, playerName }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CareerPathCompleteModal.useEffect": ()=>{
            document.body.style.overflow = "hidden";
            return ({
                "CareerPathCompleteModal.useEffect": ()=>{
                    document.body.style.overflow = "unset";
                }
            })["CareerPathCompleteModal.useEffect"];
        }
    }["CareerPathCompleteModal.useEffect"], []);
    const getMessage = ()=>{
        if (gameOver) return playerName ? `The correct player was: ${playerName}` : "The correct player was not guessed.";
        return playerName ? `You guessed the correct player: ${playerName}` : "You completed the career path!";
    };
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#2eaafd]/20 to-transparent rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#2a569c]/20 to-transparent rounded-full blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative p-8 md:p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "80",
                                        height: "80",
                                        viewBox: "0 0 1639.16 1372.8",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        role: "img",
                                        "aria-label": "trophy",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                                    children: `.cls-1{fill:#7bc143}.cls-1,.cls-2,.cls-3,.cls-4{stroke-width:0px}.cls-2{fill:#f0efef}.cls-3{fill:#fff}.cls-4{fill:#1958a4}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                lineNumber: 64,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                className: "cls-2",
                                                cx: "641.59",
                                                cy: "647.38",
                                                r: "31.54"
                                            }, void 0, false, {
                                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        className: "cls-4",
                                                        d: "M895.84,1066.31c64.45-14.07,127.88-31.54,189.36-52.18l-155.38,358.66h-261.23l-112.57-259.85c109.09-5.51,223.13-21.14,339.82-46.64Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        className: "cls-4",
                                                        d: "M1597.06,0l-161.3,204.85-56.5,130.44-2.5,5.77-46.52,107.41-155.26,358.4c-95.58,44.34-204.05,80.38-314.62,104.53-128.58,28.06-257.46,43.02-372.89,43.28l-133.38-307.93h-.03l-48.2-111.33L162.64,204.85,1.34,0l511.16,175.58,203.82,413.76c-135-118.93-400.86-270.04-400.86-270.04l174.93,214.59c-39.66,113.8,27.97,244.54,151.52,223.07,81.5-14.16,100.46-70.81,103.94-107.68l53.35,108.33,53.35-108.33c3.47,36.86,22.44,93.52,103.94,107.68,123.55,21.47,191.18-109.27,151.52-223.07l174.93-214.59s-265.86,151.11-400.86,270.04l203.82-413.76L1597.06,0Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        className: "cls-2",
                                                        cx: "956.82",
                                                        cy: "647.38",
                                                        r: "31.54"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                className: "cls-1",
                                                points: "305.86 535.42 354.09 646.75 354.06 646.75 305.86 535.42"
                                            }, void 0, false, {
                                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                className: "cls-1",
                                                points: "1376.76 341.06 1330.24 448.47 1330.21 448.47 1376.76 341.06"
                                            }, void 0, false, {
                                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                className: "cls-3",
                                                d: "M1637.11,516.34c-14.75-76.85-102.73-123.34-236.15-142.28l-21.38,49.32c86.15,19.43,139.13,53.94,145.66,94.9,7.8,48.79-20.58,121.34-152.55,215.65-50.62,36.19-108.09,69.52-170.63,99.26-100.85,48.02-214.83,86.66-334.17,112.71-132.21,28.86-264.85,44.11-383.6,44.11-6.8,0-13.49-.03-20.08-.15-236.82-2.97-347-59.07-360.55-121.05-11.63-53.41,37.95-134.21,149.84-204.73,17.49-11.01,36.01-21.97,55.41-32.71l-20.55-47.44C94.83,682.38-19.62,799.51,2.78,902.18c25.97,118.9,227.22,183.06,500.23,177.32,117.84-2.47,249.04-17.96,385.28-47.7,93.25-20.35,181.23-47.32,261.85-78.76,310.14-120.87,511.72-307.67,486.96-436.69Z"
                                            }, void 0, false, {
                                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
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
                                children: gameOver ? "Game Over!" : "Career Path Complete!"
                            }, void 0, false, {
                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-3 bg-gradient-to-r from-[#2a569c] to-[#2eaafd] text-white px-8 py-4 rounded-2xl shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold",
                                        children: playerName ?? "Player"
                                    }, void 0, false, {
                                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
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
                                children: getMessage()
                            }, void 0, false, {
                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
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
                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
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
                                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/career-path/career-path-complete-modal.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this), document.body);
}
_s(CareerPathCompleteModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = CareerPathCompleteModal;
var _c;
__turbopack_context__.k.register(_c, "CareerPathCompleteModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_career-path_e028f406._.js.map