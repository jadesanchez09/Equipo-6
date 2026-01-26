import React from "react";
import PageLayout from "../components/PageLayout";
import DescriptionBox from "../components/DescriptionBox";
import "./SoportePage.css";

function Soporte() {
    return (
        <PageLayout>
            <div className="page-inner soporte-container">
               
                <DescriptionBox
                    id="soporte-box"
                    title="Centro de Soporte"
                    description="¿Tiene problemas con la web o encontro un error? Estamos aquí para ayudarte. Contáctanos a través de nuestros canales oficiales."
                />

           
                <div className="contact-details">
                    <div className="contact-card">
                        <h3> Correo Electrónico</h3>
                        <p>carlos.mariscal1497@alumnos.udg.mx o carlosgab.mariscals@gmail.com</p>
                    </div>

                    <div className="contact-card">
                        <h3> GitHub / Reporte de Bugs</h3>
                        <p>
                            Puede abrir un "issue" en nuestro repositorio ha encontrado un error de código.
                        </p>
                        <a href="https://github.com/FerreteriaDonGus/AQUALERTV1" target="_blank" rel="noreferrer">
                            Ir al Repositorio
                        </a>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default Soporte;