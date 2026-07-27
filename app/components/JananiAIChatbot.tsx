"use client";

import { useState } from "react";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "bot",
    text: "Hello! I'm Janani AI. Ask me anything about pregnancy, nutrition, medicines or emergency care.",
    time: "09:30",
  },
];

const quickReplies = [
  "Can I eat papaya?",
  "What foods increase hemoglobin?",
  "When should I visit the doctor?",
  "Is back pain normal?",
  "What should I do in an emergency?",
];

const botReplies: Record<string, string> = {
  "can i eat papaya?": "Papaya is usually best avoided in the later stages of pregnancy. Please consult your doctor for personal guidance.",
  "what foods increase hemoglobin?": "Iron-rich foods such as spinach, lentils, beans, eggs, red meat, and fortified cereals can help increase hemoglobin.",
  "when should i visit the doctor?": "Contact your doctor if you have severe pain, heavy bleeding, reduced fetal movement, fever, or persistent vomiting.",
  "is back pain normal?": "Mild back pain is common in pregnancy, but severe or sudden pain should be checked by a healthcare professional.",
  "what should i do in an emergency?": "If it is urgent, call emergency services immediately or go to the nearest hospital. If you need urgent help, contact 108.",
};

export default function JananiAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const responseText = botReplies[trimmed.toLowerCase()] || "I'm here to help with pregnancy wellness, nutrition, medicines, and urgent care guidance. Please ask me something else.";

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: responseText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-4 py-3 text-white shadow-[0_18px_45px_-12px_rgba(190,24,93,0.6)] transition hover:scale-105"
        >
          <MessageCircle size={20} />
          <span className="font-semibold">Janani AI</span>
        </button>
      ) : (
        <div className="w-[92vw] max-w-md overflow-hidden rounded-[28px] border border-pink-100 bg-white shadow-[0_24px_70px_-20px_rgba(139,92,246,0.55)]">
          <div className="bg-gradient-to-r from-pink-600 to-violet-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-white/20 p-2">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="font-semibold">Janani AI Assistant</p>
                  <p className="text-xs text-pink-100">Always here for support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full bg-white/20 p-2">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex h-[400px] flex-col bg-gradient-to-b from-pink-50 via-white to-violet-50 p-3">
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      message.sender === "user"
                        ? "bg-pink-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`mt-1 text-[10px] ${message.sender === "user" ? "text-pink-100" : "text-gray-400"}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white px-3 py-2 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-3 rounded-2xl border border-pink-100 bg-white p-2">
              <div className="mb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 transition hover:bg-violet-100"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage(input);
                  }}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-pink-200 bg-pink-50 px-3 py-2 text-sm outline-none focus:border-pink-400"
                />
                <button
                  onClick={() => sendMessage(input)}
                  className="rounded-full bg-gradient-to-r from-pink-600 to-violet-600 p-2.5 text-white"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
