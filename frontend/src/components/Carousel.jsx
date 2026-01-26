import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

export default function Carousel({ items = [], intervalo = 5000 }) {
  const [index, setIndex] = useState(0);

  const esExterno = (url) => /^https?:\/\//i.test(url);

  // autoplay corregido
  useEffect(() => {
    const temporizador = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalo);

    return () => clearInterval(temporizador);
  }, [items.length, intervalo]);

  if (!items.length) return null;

  const { imagen, descripcion, link } = items[index] || {};
  const Wrapper = esExterno(link) ? "a" : Link;
  const wrapperProps = esExterno(link)
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { to: link };

  return (
    <div className="component-container">
      <div className="component-content component-pad">
        <div className="carousel">

          <Wrapper className="carousel-slide" {...wrapperProps}>
            <div
              className="carousel-bg"
              style={{ backgroundImage: `url(${imagen})` }}
            ></div>

            <div className="carousel-card">{descripcion}</div>
          </Wrapper>

          <div className="carousel-indicators">
            {items.map((_, i) => (
              <div
                key={i}
                className={`sc-indicator ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
