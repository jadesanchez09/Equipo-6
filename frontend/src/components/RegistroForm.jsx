import React, { useState } from "react";
import "./RegistroForm.css";

function RegistroForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.error || "Error al registrar usuario"
        });
      } else {
        setMessage({
          type: "success",
          text: "¡Usuario registrado correctamente!"
        });
        // Limpiar el formulario en caso de éxito
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Error de conexión. Por favor, intenta nuevamente."
      });
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      {message && (
        <p className={`message ${message.type}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}

export default RegistroForm;