import React, { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import DescriptionBox from "../components/DescriptionBox";
import ItemContainer from "../components/ItemContainer";
import Banner from "../components/Banner";
import "./MapsPage.css"

// assets
import map_01 from "../assets/estaticas/externas/simarmapa.png";
import map_02 from "../assets/estaticas/externas/inegi.png";
import map_03 from "../assets/estaticas/externas/biodivgobmx.png";
import map_04 from "../assets/estaticas/externas/sihconagua.png";
import map_05 from "../assets/estaticas/externas/semarnatmap.png";
import map_06 from "../assets/estaticas/externas/caminosmap.png";

import banner from "../assets/estaticas/jalisco-4526822_1920.jpg"
import img_01 from "../assets/estaticas/documentos/atlasdelagua.png";
import img_02 from "../assets/estaticas/documentos/fteccomja.png";
import img_03 from "../assets/estaticas/documentos/cuencas.png";
import img_04 from "../assets/estaticas/documentos/SINA.png";

function MapsPage() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((r) => r.json())
      .then((d) => setApiMessage(d.message))
      .catch(() => {});
  }, []);

  return (
    <PageLayout>
      <Banner fullScreen backgroundImage={banner} scrollToId="mapas" title="Mapas y documentos" subtitle="Colección de mapas y publicaciones que se irá actualizando con el tiempo. La mayoría envuelven a México, aunque nuestro enfoque es especialmente en Jalisco."/>
      <div className="page-inner">
        <DescriptionBox
          title="Mapas y documentos"
          id="mapas"
          description="Explora nuestros mapas interactivos y accede a datos detallados sobre cuerpos de agua, clima y gestión del agua en México. Nuestra plataforma ofrece visualizaciones claras y herramientas analíticas para comprender mejor el estado del agua en diversas regiones."
        />

        <ItemContainer
          titulo="Mapas y enlaces"
          items={[
            { imagen: map_01, descripcion: "Mapas satelitales de simar.conabio", link: "https://simar.conabio.gob.mx/explorer/?satmo=nsst" },
            { imagen: map_02, descripcion: "Mapas y datos de hidrología — INEGI", link: "https://www.inegi.org.mx/temas/hidrologia/#mapas" },
            { imagen: map_03, descripcion: "Tendencias de agua — biodiversidad.gob.mx", link: "https://www.biodiversidad.gob.mx/monitoreo/simoh-mx/cuerpos-de-agua" },
            { imagen: map_04, descripcion: "Sistema de Información Hidrológica — CONAGUA", link: "https://sih.conagua.gob.mx/" },
            { imagen: map_05, descripcion: "Playas limpias v22 — SEMARNAT", link: "https://gisviewer.semarnat.gob.mx/aplicaciones/Playasv22/destino.html?anio=20&destino=12_4" },
            { imagen: map_06, descripcion: "Monitoreo de calidad del agua — Caminos de Agua", link: "https://www.catis-mexico.org/es/monitoreo-calidad-agua" },
          ]}
        />

        <ItemContainer
          titulo="Documentos"
          items={[
            { imagen: img_01, descripcion: "Atlas del agua en México", link: "https://files.conagua.gob.mx/conagua/publicaciones/Publicaciones/AAM2018.pdf" },
            { imagen: img_02, descripcion: "Ficha técnica hidrológica — Jalisco", link: "https://www.ceajalisco.gob.mx/doc/fichas_hidrologicas/region4/guadalajara.pdf" },
            { imagen: img_03, descripcion: "Agua y cuencas en México — CONAHCYT", link: "https://agua.conahcyt.mx/cuencas/?navigate=division&state_id=14" },
            { imagen: img_04, descripcion: "Sistema Nacional de Información del Agua", link: "https://sinav30.conagua.gob.mx:8080/" },
          ]}
        />
      </div>
    </PageLayout>
  );
}

export default MapsPage;
