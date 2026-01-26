import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import ItemContainer from "../components/ItemContainer";
import "./FAQPage.css";


export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const preguntas = [
    {
      p: "¿Cómo funciona AquaBot?",
      r: "AquaBot recibe tus preguntas y utiliza inteligencia artificial de OpenAI para responder dudas sobre hidrología, calidad del agua y temas relacionados."
    },
    {
      p: "¿El servicio tiene algún costo?",
      r: "Todo el contenido del portal es totalmente gratuito y no planeamos implementar pagos pronto."
    },
    {
      p: "¿De dónde obtienen la información?",
      r: "Los artículos, documentos y herramientas redirigen a las fuentes oficiales. Aqualert solo organiza y presenta la data."
    },
    {
      p: "¿Puedo reportar una fuga aquí?",
      r: "Por ahora no recibimos reportes, pero recomendamos contactar a las autoridades responsables de tu localidad."
    }
  ];

  return (
    <PageLayout>
      <div className="page-inner faq-container">
        
        <header className="faq-header">
          <h1>Preguntas Frecuentes</h1>
          <p>Resolvemos tus dudas principales sobre el uso y cuidado del agua.</p>
        </header>

        <div className="faq-list">
          {preguntas.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{item.p}</h3>
                <span className={`arrow ${activeIndex === index ? "open" : ""}`}>
                  ▼
                </span>
              </div>
              <div className="faq-answer">
                <p>{item.r}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3>¿No encontraste lo que buscabas?</h3>
          <Link to="/soporte" className="btn-support">
            Contactar a Soporte
          </Link>
        </div>

      </div>
    </PageLayout>
  );
}
