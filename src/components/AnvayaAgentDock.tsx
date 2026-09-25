"use client";

import React, { useState } from "react";
import { AgentDock } from "@/components/ui/agent-dock";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Bot, X, CheckCircle2, ArrowRight } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "zara";
  text: string;
  timestamp: string;
}

const AVATAR_URL =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80";

const QUICK_PROMPTS = [
  "What is the 14-day sprint scope?",
  "What is your tech stack?",
  "How do I book a call?",
];

export function AnvayaAgentDock() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "zara",
      text: "Hello! I am Zara, Anvaya's AI Systems Assistant. Ask me anything about our 10-14 day production sprints, architecture, or scheduling.",
      timestamp: "Just now",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("14-day") || q.includes("sprint") || q.includes("timeline") || q.includes("how long")) {
      return "Anvaya delivers production-grade MVPs and vector backends in exactly 10 to 14 days with zero fluff. Every sprint includes full architecture specs, database migrations, CI/CD pipeline, and Day-1 sovereign IP handoff.";
    }
    if (q.includes("cost") || q.includes("price") || q.includes("pricing") || q.includes("budget") || q.includes("how much")) {
      return "Our productized sprints range from $18,500 for a 14-Day Production Launchpad up to $28,000 for deep tech AI vector engines & high-throughput pipelines. Use our Scope Calculator on this page for custom estimates!";
    }
    if (q.includes("stack") || q.includes("tech") || q.includes("database") || q.includes("rust") || q.includes("next")) {
      return "Our stack is built for high reliability: Next.js 16 with Turbopack, React 19, TypeScript, Tailwind CSS v4, FastAPI/Python, PostgreSQL with pgvector, and checkDK Rust AST analysis tooling.";
    }
    if (q.includes("book") || q.includes("call") || q.includes("schedule") || q.includes("contact") || q.includes("intake")) {
      return "You can schedule a call immediately via our intake section below, or book directly at cal.com/anvaya-studio/15min. We review project specs within 4 hours.";
    }
    return `Thanks for asking about "${query}". At Anvaya, we transform conceptual architecture into hardened, production software in 14-day timeboxes. Would you like to review our sprint roadmap or initiate intake?`;
  };

  const handleMessageSubmit = async (userText: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsOpen(true);
    setIsTyping(true);

    // Simulate agent reasoning delay
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: "zara",
      text: generateAnswer(userText),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-3rem)]">
      {/* Floating Chat History Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] sm:w-[400px] max-h-[460px] flex flex-col rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl overflow-hidden text-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                  <Bot className="size-4" />
                </span>
                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-slate-900 flex items-center gap-1.5">
                    Zara AI <Sparkles className="size-3 text-blue-600" />
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">Anvaya Systems Copilot</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[280px] text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      m.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/50"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1.5 text-slate-400 italic text-[11px] px-2 py-1">
                  <span className="size-1.5 rounded-full bg-blue-600 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                  <span>Zara is synthesizing...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleMessageSubmit(prompt)}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="size-2.5 opacity-60" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Controller */}
      <AgentDock
        agentName="Zara"
        avatarSrc={AVATAR_URL}
        className="w-[340px] sm:w-[380px] shadow-2xl transition-transform hover:scale-[1.01]"
        idleStatus="Ask Anvaya Copilot"
        workingStatus="Processing query..."
        onMessageSubmit={handleMessageSubmit}
      />
    </div>
  );
}

export default AnvayaAgentDock;
