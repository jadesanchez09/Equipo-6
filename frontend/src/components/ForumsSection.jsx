import React from "react";
import { Link } from "react-router-dom";
import "./ForumsSection.css";

function ForumsSection() {
    return (
        <div className="component-container">
            <div className="component-content forums-section component-pad">
                <h2>Foros de Discusión</h2>
                <div className="forum-links">
                    <Link to="/informacion" className="forum-link" aria-label="Ir a información">
                        Información
                    </Link>
                    <Link to="/mapas" className="forum-link" aria-label="Ir a mapas y centro de datos">
                        Mapas y Data Center
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForumsSection;