"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, MessageCircle, Send, Speaker, VolumeX, X, Sparkles } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
  time: string;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    SpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

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

export default function JananiAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceSupportMessage, setVoiceSupportMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const speechSupported = useMemo(() => typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setVoiceSupportMessage("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();

      if (transcript) {
        setInput(transcript);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setVoiceSupportMessage(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    synthRef.current = window.speechSynthesis;
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!speechSupported) {
      setVoiceSupportMessage("Speech recognition is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      setVoiceSupportMessage("Speech recognition is unavailable right now.");
      return;
    }

    setVoiceSupportMessage("");
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const sendMessage = async (text: string) => {
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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: [...messages, userMessage],
        }),
      });

      const data = await response.json().catch(() => null);
      const responseText = typeof data?.reply === "string" && data.reply.trim()
        ? data.reply.trim()
        : (typeof data?.message === "string" && data.message.trim() ? data.message.trim() : "Sorry, I couldn't process your request. Please try again.");

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
      if (voiceEnabled && responseText && !responseText.startsWith("Sorry")) {
        speakText(responseText);
      }
    } catch {
      const fallbackMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "I’m unable to answer right now. Please try again shortly.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
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

              {voiceSupportMessage ? (
                <p className="mb-2 text-xs text-amber-700">{voiceSupportMessage}</p>
              ) : null}

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

              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${isListening ? "bg-rose-600 text-white" : "bg-pink-100 text-pink-700"}`}
                >
                  {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                  {isListening ? "Stop Listening" : "Start Listening"}
                </button>
                <button
                  onClick={() => speakText(messages[messages.length - 1]?.text || "")}
                  className="flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700"
                >
                  <Speaker size={14} />
                  Speak Response
                </button>
                <button
                  onClick={() => {
                    setVoiceEnabled(false);
                    if (typeof window !== "undefined") {
                      window.speechSynthesis?.cancel();
                    }
                  }}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700"
                >
                  <VolumeX size={14} />
                  Mute Voice
                </button>
              </div>

              {isListening ? (
                <div className="mt-2 flex items-center gap-2 text-xs text-pink-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-pink-600" />
                  Listening for your voice...
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
