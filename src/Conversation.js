import React, { useState, useEffect, useRef } from "react";
import "./Conversation.css";

const API_URL = process.env.REACT_APP_CHAT_API;

function getSessionId() {
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("sessionId", id);
  }
  return id;
}

function Conversation() {
  const [isHome, setIsHome] = useState(true); // Home page control
  const [sessionId, setSessionId] = useState(getSessionId());
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch(`${API_URL}/sessions`);
      const data = await res.json();
      if (Array.isArray(data)) setSessions(data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchSessions(); }, [sessionId]);

  useEffect(() => {
    if (!isHome) {
      const fetchHistory = async () => {
        const res = await fetch(`${API_URL}?sessionId=${sessionId}`);
        const data = await res.json();
        if (Array.isArray(data)) setMessages(data);
      };
      fetchHistory();
    }
  }, [sessionId, isHome]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const startNewChat = () => {
    const newId = crypto.randomUUID();
    localStorage.setItem("sessionId", newId);
    setSessionId(newId);
    setMessages([]);
    setIsHome(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    setInput("");
    setLoading(true);
    setMessages(prev => [...prev, { sender: "user", text: userText, timestamp: Date.now() }]);

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, sessionId })
      });
      fetchSessions();
      const res = await fetch(`${API_URL}?sessionId=${sessionId}`);
      const data = await res.json();
      setMessages(data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  // --- HOME PAGE UI ---
  if (isHome) {
    return (
      <div className="home-container">
        <div className="home-card">
          <h1>Welcome to <span className="purple-text">AI Chatbot</span></h1>
          <p>Your smart assistant for instant answers and conversations.</p>
          <div className="features">
            <div className="feature">⚡ <b>Fast Responses</b><br/>Get instant replies.</div>
            <div className="feature">✨ <b>Smart Conversations</b><br/>Natural AI experience.</div>
            <div className="feature">🛡️ <b>Secure & Private</b><br/>Safe and protected.</div>
          </div>
          <button className="start-btn" onClick={() => setIsHome(false)}>Start Chatting</button>
        </div>
      </div>
    );
  }

  // --- CHAT PAGE UI ---
  return (
    <div className="app-layout">
      <div className="sidebar">
        <h3>Chat History</h3>
        <button className="back-home-btn" onClick={() => setIsHome(true)}>← Back Home</button>
        <button className="new-chat-btn" onClick={startNewChat}>+ New Chat</button>
        <div className="session-list">
          {sessions.map(s => (
            <div key={s.id} className={`session-item ${s.id === sessionId ? 'active' : ''}`} onClick={() => setSessionId(s.id)}>
              {s.title}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">AI Chatbot</div>
        <div className="chat-body">
          {messages.map((m, i) => (
            <div key={i} className={`message-wrapper ${m.sender}`}>
              <div className={`message ${m.sender}`}>{m.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." />
          <button onClick={sendMessage} disabled={loading}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Conversation;