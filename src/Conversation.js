import { useState } from "react";
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
  const [sessionId] = useState(getSessionId());
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    setMessages(m => [...m, { sender: "user", text: userMessage }]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          sessionId
        })
      });

      const data = await res.json();

      setMessages(m => [
        ...m,
        { sender: "bot", text: data.reply || "No response" }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(m => [
        ...m,
        { sender: "bot", text: "Server error" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Chatbot</div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
        {loading && <div className="message bot">Typing...</div>}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Conversation;
