import React, { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage() {
    if (!input.trim()) return;

    
    const inputUsuario = input;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: input }]);
    setIsLoading(true);

    try{

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputUsuario })
      });

      if (!response.ok) throw new Error("Error en el servidor");


      const data = await response.json();
      setMessages(prev => [...prev, { from: "bot", text: data.response }]); //aqui en teoria inserta las respuestas del bot
    } catch(error) {
      setMessages(prev=> [...prev, {from: "bot", text: "Estoy teniendo problemas de conexion :("}])
    
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Botón flotante */}
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💭
      </button>

      {/* Ventana del chat */}
      <div className={`chat-window ${open ? "open" : ""}`}>
        <div className="chat-header">
          <span>AquaBot 🌊</span>
          <button onClick={() => setOpen(false)}>⤫</button>
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.from}`}>
              {msg.text}
            </div>
          ))}

          {isLoading && <div className="msg bot">Escribiendo... </div>}
          <div ref={bottomRef}></div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>📨</button>
        </div>
      </div>
    </>
  );
}
