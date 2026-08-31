"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CHATBOT_NAME,
  QUICK_PROMPTS,
  getChatbotResponse,
  type ChatLink,
} from "@/lib/chatbot/responder";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: ChatLink[];
}

function createMessage(
  role: Message["role"],
  text: string,
  links?: ChatLink[]
): Message {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    links,
  };
}

function renderLink(link: ChatLink, onPrompt?: (prompt: string) => void) {
  if (link.href.startsWith("#prompt:")) {
    const prompt = decodeURIComponent(link.href.replace("#prompt:", ""));
    return (
      <button
        key={link.href}
        type="button"
        onClick={() => onPrompt?.(prompt)}
        className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold hover:bg-gold/20 transition-colors"
      >
        {link.label}
      </button>
    );
  }

  const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a
        key={link.href}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold hover:bg-gold/20 transition-colors"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      key={link.href}
      href={link.href}
      className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs text-gold hover:bg-gold/20 transition-colors"
    >
      {link.label}
    </Link>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    createMessage(
      "assistant",
      `Hi! I'm ${CHATBOT_NAME}, your ADJ TRUCKS assistant. Ask me about our trucks, contact details, hours, financing, or how to find your way around the site.`,
      QUICK_PROMPTS.map((prompt) => ({
        label: prompt,
        href: `#prompt:${encodeURIComponent(prompt)}`,
      }))
    ),
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  const sendMessage = (raw: string) => {
    const question = raw.trim();
    if (!question || typing) return;

    setMessages((current) => [...current, createMessage("user", question)]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const response = getChatbotResponse(question);
      setMessages((current) => [
        ...current,
        createMessage("assistant", response.text, response.links),
      ]);
      setTyping(false);
    }, 450);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed safe-bottom safe-left z-50 flex w-[min(calc(100vw-2rem),24rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-charcoal-deep/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
            style={{ maxHeight: "min(70vh, 32rem)" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-metallic-gradient px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gold">{CHATBOT_NAME}</p>
                  <p className="text-xs text-muted-foreground">ADJ TRUCKS Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                      message.role === "user"
                        ? "rounded-br-md bg-gold text-charcoal-deep"
                        : "rounded-bl-md border border-white/10 bg-white/5 text-foreground"
                    )}
                  >
                    {message.text}
                    {message.links && message.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.links.map((link) =>
                          renderLink(link, sendMessage)
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gold/70 [animation-delay:-0.2s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gold/70 [animation-delay:-0.1s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gold/70" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-charcoal-deep/80 p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask ADJ anything about the site..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-gold/40"
                  maxLength={500}
                  aria-label="Message ADJ assistant"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 shrink-0 bg-gold text-charcoal-deep hover:bg-gold/90"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          aria-label={`Chat with ${CHATBOT_NAME} assistant`}
          className="fixed safe-bottom safe-left z-50 flex h-14 items-center gap-2 rounded-full border border-gold/30 bg-charcoal-deep px-4 text-gold shadow-lg shadow-black/30 touch-manipulation"
        >
          <Bot className="h-5 w-5" />
          <span className="text-sm font-semibold">{CHATBOT_NAME}</span>
        </motion.button>
      )}
    </>
  );
}
