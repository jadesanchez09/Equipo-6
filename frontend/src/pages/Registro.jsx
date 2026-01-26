import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import RegistroForm from "../components/RegistroForm";
import DescriptionBox from "../components/DescriptionBox";
import "./Registro.css";
import { Link } from "react-router-dom"

function Registro() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const datos = await respuesta.json();
            if (respuesta.ok) {
                setMessage("Usuario registrado exitosamente.");
                setFormData({ username: "", email: "", password: "" });
            } else {
                setMessage(datos.error || "Error al registrar el usuario.");
            }
        } catch (error) {
            setMessage("Error al conectar con el servidor.");
        }
    };

    return (
        <PageLayout>
            <div className="page-inner">
                <DescriptionBox
                id="Mantenimiento"
                title="Registros temporalmente deshabilitados" 
                description="Lamentamos el inconveniente, los registros están temporalmente deshabilitados debido a interrupciones en el desarrollo. Esperamos tener todo listo pronto :("
                />
                <div className="registro-window">
                    <div className="registro-card">
                        <h1>Registrarse</h1>
                        <RegistroForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            message={message}
                        />
                        <p style={{ textAlign: "center", marginTop: "1.5rem"}}>
                            ¿Ya tiene una cuenta? {" "}
                            <Link to="/login" style={{color: "#8ee08e", textDecoration: "underline", cursor: "pointer"}}>Iniciar Sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default Registro;