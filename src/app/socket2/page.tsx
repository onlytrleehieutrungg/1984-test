"use client";
import React, { useEffect } from "react";
import { io, Socket as ClientSocket } from "socket.io-client";

const socket: ClientSocket = io("http://localhost:3001"); // Connect to the server

export default function Socket() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (msg: string) => {
      setMessages(
        (prevMessages: string[]) => [...prevMessages, msg] as never[]
      );
    });

    // Cleanup the event listener on unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message); // Send message to the server
      setMessage("");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Socket.IO Chat (TypeScript)</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: "10px", width: "80%" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>
        Send
      </button>
    </div>
  );
}
