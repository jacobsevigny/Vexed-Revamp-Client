(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/image.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const trophyImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q1-rOZnt08GsRDIHnGPDFVfrASC70rIYJ.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q2-IZmcUJXexbvL1qXWB4AOyofm0PPlPU.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q3-GzKC5Eyl5NGxTX5un4E9HItvSuz0b6.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q4-gZ0uyxTJITeZiwiL0NFWHkOsB0Rkth.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/q5-jDBIioaILMBEK81kJsok4mziqx1Y10.png"
];
function QuestionBox({ index, unlocked, answered, correct, locked, onClick, active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        onClick: unlocked ? onClick : undefined,
        className: `
        relative w-24 h-24 md:w-32 md:h-32 rounded-2xl
        flex items-center justify-center
        font-bold text-2xl transition-all duration-300
        ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}
        ${locked ? "opacity-40" : "opacity-100"}
        ${answered ? correct ? "bg-[#08947C] border-4 border-[#152a4d]" : "bg-[#ff346c] border-4 border-[#152a4d]" : active ? "bg-[#2a569c] border-4 border-[#152a4d] shadow-lg shadow-blue-500/50" : "bg-[#2a569c] border-4 border-[#152a4d]"}
      `,
        whileHover: unlocked ? {
            scale: 1.05
        } : {},
        whileTap: unlocked ? {
            scale: 0.95
        } : {},
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center text-white relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: trophyImages[index] || "/placeholder.svg",
                        alt: `Question ${index + 1}`,
                        width: 80,
                        height: 80,
                        className: "w-16 h-16 md:w-20 md:h-20"
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    answered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.5
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        className: "absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                            size: 16,
                            className: "text-[#2a569c]"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            active && !answered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 rounded-2xl border-4 border-white",
                animate: {
                    opacity: [
                        0.5,
                        1,
                        0.5
                    ]
                },
                transition: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY
                }
            }, void 0, false, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c = QuestionBox;
var _c;
__turbopack_context__.k.register(_c, "QuestionBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuestionModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function QuestionModal({ question, answersDb, allNames, onSubmit, onClose, review, guess, correctAnswer, wasCorrect }) {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionModal.useEffect": ()=>{
            const handleClickOutside = {
                "QuestionModal.useEffect.handleClickOutside": (e)=>{
                    if (e.target === overlayRef.current) {
                        onClose();
                    }
                }
            }["QuestionModal.useEffect.handleClickOutside"];
            window.addEventListener("mousedown", handleClickOutside);
            return ({
                "QuestionModal.useEffect": ()=>window.removeEventListener("mousedown", handleClickOutside)
            })["QuestionModal.useEffect"];
        }
    }["QuestionModal.useEffect"], [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionModal.useEffect": ()=>{
            document.body.style.overflow = "hidden";
            return ({
                "QuestionModal.useEffect": ()=>{
                    document.body.style.overflow = "unset";
                }
            })["QuestionModal.useEffect"];
        }
    }["QuestionModal.useEffect"], []);
    const normalize = (text)=>text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().trim();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionModal.useEffect": ()=>{
            if (!input.trim() || !allNames || allNames.length === 0) {
                setSuggestions([]);
                return;
            }
            const normalizedInput = normalize(input.trim());
            const filtered = allNames.filter({
                "QuestionModal.useEffect.filtered": (name)=>normalize(name).includes(normalizedInput)
            }["QuestionModal.useEffect.filtered"]).slice(0, 10);
            setSuggestions(filtered);
        }
    }["QuestionModal.useEffect"], [
        input,
        allNames
    ]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (input.trim() && onSubmit) {
            onSubmit(input);
            setInput("");
        }
    };
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createPortal(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            ref: overlayRef,
            className: "fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-start justify-center p-4 pt-20",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "relative bg-[#2a569c] rounded-3xl shadow-2xl w-full max-w-2xl",
                initial: {
                    scale: 0.9,
                    opacity: 0,
                    y: 20
                },
                animate: {
                    scale: 1,
                    opacity: 1,
                    y: 0
                },
                exit: {
                    scale: 0.9,
                    opacity: 0,
                    y: 20
                },
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-[#152a4d] to-[#2a569c] p-6 md:p-8 rounded-t-3xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "absolute top-4 right-4 text-white/80 hover:text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl md:text-2xl font-bold text-white text-center pr-8",
                                children: question
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 md:p-8",
                        children: review ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `p-4 rounded-xl border-2 ${wasCorrect ? "bg-[#08947C] border-[#08947C]" : "bg-[#ff346c] border-[#ff346c]"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80 mb-1",
                                            children: "Your Answer:"
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-bold text-white",
                                            children: guess
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                    lineNumber: 110,
                                    columnNumber: 17
                                }, this),
                                !wasCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-xl border-2 bg-[#08947C] border-[#08947C]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80 mb-1",
                                            children: "Correct Answer:"
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                            lineNumber: 120,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-bold text-white",
                                            children: correctAnswer
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                            lineNumber: 121,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                    lineNumber: 119,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                            lineNumber: 109,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        name: "answer",
                                        type: "text",
                                        placeholder: "Type your answer...",
                                        value: input,
                                        onChange: (e)=>setInput(e.target.value),
                                        className: "w-full px-6 py-4 text-lg bg-[#152a4d] text-white placeholder:text-white/50 border-2 border-[#152a4d] rounded-xl focus:outline-none focus:border-[#2eaafd] focus:ring-4 focus:ring-[#2eaafd]/20 transition-all",
                                        autoFocus: true,
                                        autoComplete: "off"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                        lineNumber: 128,
                                        columnNumber: 19
                                    }, this),
                                    suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-full left-0 right-0 mt-2 bg-[#152a4d] border-2 border-[#2eaafd] rounded-xl shadow-xl max-h-60 overflow-y-auto z-[10001]",
                                        children: suggestions.map((name, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-6 py-3 cursor-pointer text-white hover:bg-[#2eaafd]/20 transition-colors border-b border-white/10 last:border-b-0",
                                                onClick: ()=>{
                                                    if (onSubmit) {
                                                        onSubmit(name);
                                                        setInput("");
                                                    }
                                                },
                                                children: name
                                            }, idx, false, {
                                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                                lineNumber: 141,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                        lineNumber: 139,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                                lineNumber: 127,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                            lineNumber: 126,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this), document.body);
}
_s(QuestionModal, "uJYBcN+aYmPfCLBQHeMpyftuS7M=");
_c = QuestionModal;
var _c;
__turbopack_context__.k.register(_c, "QuestionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Projects/Revamp-Simple/client/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/lib/auth-context.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
async function authFetch(path, options = {}) {
    _s();
    // This must be called inside a React component or hook
    const { accessToken, refreshToken, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    let token = accessToken;
    // If token is expired, try to refresh
    if (token && ("TURBOPACK compile-time value", "object") !== 'undefined') {
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
_s(authFetch, "tNrN6AhqAW/IBL116Nd3pm+yfwo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DailyQuestPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/next@16.0.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/framer-motion@12.38.0_@emot_6728e3b9e82a6a76dad9113d189eb322/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$daily$2d$quest$2f$question$2d$box$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-box.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$daily$2d$quest$2f$question$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/components/daily-quest/question-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/node_modules/.pnpm/lucide-react@0.454.0_react@19.2.0/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GitHub Projects/Revamp-Simple/client/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const today = new Date().toISOString().split("T")[0];
function DailyQuestPage() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [answered, setAnswered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCongrats, setShowCongrats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [reviewIndex, setReviewIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [allNames, setAllNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DailyQuestPage.useEffect": ()=>{
            const checkMobile = {
                "DailyQuestPage.useEffect.checkMobile": ()=>setIsMobile(window.innerWidth < 768)
            }["DailyQuestPage.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return ({
                "DailyQuestPage.useEffect": ()=>window.removeEventListener("resize", checkMobile)
            })["DailyQuestPage.useEffect"];
        }
    }["DailyQuestPage.useEffect"], []);
    const getStorageKey = ()=>`trivia_progress_guest_${today}`;
    const normalize = (text)=>text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().trim();
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DailyQuestPage.useCallback[load]": async ()=>{
            try {
                setStatus("loading");
                setErrorMsg("");
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyQuest"])();
                if (!data) {
                    setStatus("empty");
                    return;
                }
                // Map API shape to local shape
                const mapped = data.map({
                    "DailyQuestPage.useCallback[load].mapped": (q)=>({
                            id: q.id,
                            text: q.text,
                            answer: q.answer,
                            answers_db: q.answers_db
                        })
                }["DailyQuestPage.useCallback[load].mapped"]);
                setQuestions(mapped);
                setStatus("ready");
                // Only use guest/localStorage progress
                const storageKey = getStorageKey();
                const stored = localStorage.getItem(storageKey);
                if (stored) {
                    const progress = JSON.parse(stored);
                    setAnswered(progress);
                    setCurrent(progress.length);
                    // Check if completed
                    if (progress.length === mapped.length) {
                        const finalScore = progress.filter({
                            "DailyQuestPage.useCallback[load]": (a)=>a.correct
                        }["DailyQuestPage.useCallback[load]"]).length;
                        setScore(finalScore);
                        const completedKey = `${storageKey}_completed`;
                        if (localStorage.getItem(completedKey) === "true") {
                            setShowCongrats(true);
                        }
                    }
                }
            } catch (err) {
                setStatus("error");
                setErrorMsg(err?.message || "Network error");
            }
        }
    }["DailyQuestPage.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DailyQuestPage.useEffect": ()=>{
            load();
        }
    }["DailyQuestPage.useEffect"], [
        load
    ]);
    const handleBoxClick = (i)=>{
        if (i === current) {
            setShowModal(true);
        } else if (answered.find((a)=>a.index === i)) {
            setReviewIndex(i);
        }
    };
    const handleAnswerSubmit = (input)=>{
        if (status !== "ready" || current >= questions.length) return;
        const correctAnswer = normalize(questions[current].answer);
        const userAnswer = normalize(input);
        const isCorrect = userAnswer === correctAnswer;
        const updated = [
            ...answered,
            {
                index: current,
                correct: isCorrect,
                guess: input
            }
        ];
        setAnswered(updated);
        setCurrent(updated.length);
        setShowModal(false);
        // Save to localStorage
        const storageKey = getStorageKey();
        localStorage.setItem(storageKey, JSON.stringify(updated));
        if (updated.length === questions.length) {
            const finalScore = updated.filter((a)=>a.correct).length;
            setScore(finalScore);
            setShowCongrats(true);
            localStorage.setItem(`${storageKey}_completed`, "true");
            localStorage.setItem(`${storageKey}_score`, finalScore.toString());
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DailyQuestPage.useEffect": ()=>{
            if (showModal && questions[current]) {
                // Fetch autocomplete / full name list from server
                ;
                ({
                    "DailyQuestPage.useEffect": async ()=>{
                        try {
                            const names = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllNames"])(questions[current].answers_db);
                            setAllNames(names);
                        } catch (err) {
                            setAllNames([]);
                        }
                    }
                })["DailyQuestPage.useEffect"]();
            }
        }
    }["DailyQuestPage.useEffect"], [
        showModal,
        questions,
        current
    ]);
    if (status === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center min-h-screen w-full bg-[#2eaafd] pt-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-white font-medium",
                            children: "Loading Daily Quest..."
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                    lineNumber: 140,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this)
        }, void 0, false);
    }
    if (status === "empty") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen w-full flex items-center justify-center px-4 bg-[#2eaafd] pt-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold mb-4 text-[#152a4d]",
                            children: "No Daily Quest Yet"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                            lineNumber: 154,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "There aren't any trivia questions published for today yet. Check back later!"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this)
        }, void 0, false);
    }
    if (status === "error") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen w-full flex items-center justify-center px-4 bg-[#2eaafd] pt-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold mb-4 text-red-600",
                            children: "Something went wrong"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                            lineNumber: 169,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-6",
                            children: errorMsg
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: load,
                            className: "px-6 py-3 rounded-xl bg-[#2a569c] text-white font-semibold hover:bg-[#1e4070] transition-colors",
                            children: "Try Again"
                        }, void 0, false, {
                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                    lineNumber: 168,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this)
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen w-full bg-[#2eaafd] flex items-center justify-center px-4 py-12 pt-24",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-6xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: "text-center mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-5xl font-bold text-white mb-4",
                                children: "Daily Quest"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white/80 text-lg",
                                children: "Answer 5 sports trivia questions to complete today's quest"
                            }, void 0, false, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/60 text-sm",
                                        children: "Progress:"
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-bold",
                                        children: [
                                            answered.length,
                                            "/5"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-center gap-6 md:gap-8`,
                        children: questions.map((_, i)=>{
                            const record = answered.find((a)=>a.index === i);
                            const isAnswered = !!record;
                            const correct = record?.correct ?? false;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$framer$2d$motion$40$12$2e$38$2e$0_$40$emot_6728e3b9e82a6a76dad9113d189eb322$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            scale: 0.8,
                                            opacity: 0
                                        },
                                        animate: {
                                            scale: 1,
                                            opacity: 1
                                        },
                                        transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                            delay: i * 0.1
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$daily$2d$quest$2f$question$2d$box$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            index: i,
                                            unlocked: i === current || isAnswered,
                                            answered: isAnswered,
                                            correct: correct,
                                            locked: i > current,
                                            onClick: ()=>handleBoxClick(i),
                                            active: showModal && current === i || reviewIndex === i
                                        }, void 0, false, {
                                            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 19
                                    }, this),
                                    i < questions.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$454$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: `${isMobile ? "rotate-90" : ""} text-white/40 transition-all duration-300 ${isAnswered ? "text-white/80" : ""}`,
                                        size: isMobile ? 32 : 40
                                    }, void 0, false, {
                                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                                lineNumber: 206,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this),
                    showModal && current < questions.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$daily$2d$quest$2f$question$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        question: questions[current].text,
                        answersDb: questions[current].answers_db,
                        allNames: allNames,
                        onSubmit: handleAnswerSubmit,
                        onClose: ()=>setShowModal(false)
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                        lineNumber: 236,
                        columnNumber: 13
                    }, this),
                    reviewIndex !== null && reviewIndex < questions.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GitHub__Projects$2f$Revamp$2d$Simple$2f$client$2f$components$2f$daily$2d$quest$2f$question$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        question: questions[reviewIndex].text,
                        answersDb: questions[reviewIndex].answers_db,
                        review: true,
                        guess: answered.find((a)=>a.index === reviewIndex)?.guess ?? "",
                        correctAnswer: questions[reviewIndex].answer,
                        wasCorrect: answered.find((a)=>a.index === reviewIndex)?.correct ?? false,
                        onClose: ()=>setReviewIndex(null)
                    }, void 0, false, {
                        fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                        lineNumber: 246,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/GitHub Projects/Revamp-Simple/client/app/dailyquest/page.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
_s(DailyQuestPage, "cpnFasf3gB9vvvLdS++Ap1x8J6Q=");
_c = DailyQuestPage;
var _c;
__turbopack_context__.k.register(_c, "DailyQuestPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=GitHub%20Projects_Revamp-Simple_client_3108d0af._.js.map