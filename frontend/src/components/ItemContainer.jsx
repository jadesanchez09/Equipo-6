import React from "react";
import { Link } from "react-router-dom";
import "./ItemContainer.css"

function ItemContainer({titulo, items=[]}){
  const esExterno = (url) => /^https?:\/\//i.test(url); //corregido test no text
  
  return (
    <div className="component-container">
      <div className="component-content">
        <div className="item-container">
          <div className="item-container-header">
            <h2>{titulo}</h2>
          </div>
          <div className="item-container-grid">
            {items.map((it, i)=>{
              const imagen = it.imagen || "https://via.placeholder.com/400";
              const link = it.link || "#";
              const descripcion = it.descripcion || "Placeholder";
              const Wrapper = esExterno(link) ? "a": Link; //si es externo se usa <a> si no, se usa <Link>
              const wrapperProps = esExterno(link)
              ? {href: link, target: "_blank", rel:"noopener noreferer"}
              : {to: link};

              return (
                <Wrapper key={i} className="item clickable-item" {...wrapperProps}>
                  <div className="item-background" style={{backgroundImage: `url(${imagen})`}}/>
                  <div className="item-card">
                    <span className="item-link">{descripcion}</span>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemContainer;