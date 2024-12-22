import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatbotWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("./login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });
      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = {
        text: "Sorry, I couldn't process that.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
    setInput("");
  };
  const [sessionStart, setSessionStart] = useState(new Date());
  const resetChat = () => {
    setMessages([]);
    setSessionStart(new Date());
  };

  return (
    <div className="chatbot-widget">
      <div>
        <h2>Welcome to the Chatbot!</h2>
        {/* Chatbot interface here */}
        {/* <button onClick={() => navigate("./login")}>Logout</button> */}
      </div>
      <p>Session started at: {sessionStart.toLocaleString()}</p>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={resetChat}>Reset</button>
      </div>
    </div>
  );
};

export default ChatbotWidget;
