import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';

export default function Home() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const userMessage = { text, type: 'user' };
    setMessages([...messages, userMessage]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();
    const botMessage = { text: data.response, type: 'bot' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <div>
      <h1>Book Recommendation Chatbot</h1>
      <ChatBox messages={messages} onSend={handleSend} />
    </div>
  );
}
