import React from "react";
import PageLayout from "../components/PageLayout";
import LoginForm from "../components/LoginForm";
import "./Registro.css";
import { Link } from "react-router-dom"

function Login() {
    return (
        <PageLayout>
            <div className="page-inner">
                <div className="registro-window">
                    <div className="registro-card">
                        <h1>Iniciar sesión</h1>
                        <LoginForm />
                        <p style={{ textAlign: "center", marginTop: "1.5rem"}}>
                            ¿Aún no está registrado? {" "}
                            <Link to="/registro" style={{color:"#8ee08e", textDecoration:"underline", cursor:"pointer"}}>Registrarse</Link>
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default Login;
