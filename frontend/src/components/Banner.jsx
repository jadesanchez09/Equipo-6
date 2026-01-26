import React from "react";
import "./Banner.css";

function Banner({
  title = "AquaAlert",
  subtitle = "Identifica riesgos, recibe alertas, actúa.",
  className = "",
  fullScreen = false,
  backgroundImage = null,
  backgroundVideo = null, // <--- Nueva prop para el video
  scrollToId = null,
}) {
  const handleScroll = () => {
    if (!scrollToId) return;
    const el = document.getElementById(scrollToId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`banner-wrapper ${fullScreen ? "fullscreen" : ""}`}
      // Solo aplicamos el estilo de fondo inline si NO hay video
      // Si hay video, la imagen se usa como 'poster' en la etiqueta video
      style={
        !backgroundVideo && backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {/* Si hay video, lo ponemos aquí como fondo */}
      {backgroundVideo && (
        <video
          className="banner-video-bg"
          autoPlay
          loop
          muted
          playsInline
          poster={backgroundImage} // La imagen carga antes que el video
        >
          <source src={backgroundVideo} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      )}

      {/* blur overlay (ahora tapará también al video) */}
      <div className="banner-overlay" />

      <div className={`component-container banner ${className}`}>
        <div className="component-content banner-content component-pad">
          <h1>{title}</h1>
          <p>{subtitle}</p>

          {scrollToId && (
            <button className="scroll-down-btn" onClick={handleScroll}>
              ↓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;