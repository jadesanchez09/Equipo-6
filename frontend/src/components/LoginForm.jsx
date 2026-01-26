import React, { useState } from "react";
import "./RegistroForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({
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

    console.log(">> Enviando login:", formData);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      console.log(">> Respuesta del backend:", data);

      if (!res.ok) {
        setMessage({
          type: "error",
          text: data.error || "Credenciales incorrectas"
        });
      } else {
        setMessage({
          type: "success",
          text: "Inicio de sesión exitoso"
        });
      }

    } catch (err) {
      console.error(">> Error de conexión:", err);
      setMessage({
        type: "error",
        text: "Error al conectar con el servidor."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-form-container">
      <form onSubmit={handleSubmit}>

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
          {loading ? "Ingresando..." : "Iniciar Sesión"}
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

export default LoginForm;
