import React from "react";
import "./PDF.css"

function PDF ({ src, titulo = "Documento", height = "70vh", fallbackImage }){
    if(!src && !fallbackImage) return null;

    return (
        <section className="component-container">
            <div className="component-content">
                <div className="pdf-container">
                    {titulo && <h2 className="pdf-title">{titulo}</h2>}

                    <div className="pdf-frame-wrapper" style={{ height }}>
                        {src ? (
                            <iframe src={src} title={titulo} className={"pdf-frame"}/>
                        ) : (
                            <img src={fallbackImage} alt={titulo} className="pdf-image-fallback"/>
                        )}
                    </div>
                </div>
            </div>

        </section>
    );
}

export default PDF;

