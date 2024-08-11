import React, { useState } from 'react';

export default function ChatBox({ messages, onSend }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (input.trim()) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (response.ok) {
          const data = await response.json();
          onSend({ type: 'user', text: input });  // Save user message
          onSend({ type: 'bot', text: data.response });  // Save bot response
        } else {
          setError('Failed to get response from server.');
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        setError('An unexpected error occurred.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
        setInput('');
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {typeof msg.text === 'string'
              ? msg.text.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))
              : <p>{JSON.stringify(msg.text)}</p>}
          </div>
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
