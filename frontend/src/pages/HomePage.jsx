import React, { useEffect, useState } from "react";
import ItemContainer from "../components/ItemContainer";
import PageLayout from "../components/PageLayout";
import Banner from "../components/Banner";
import DescriptionBox from "../components/DescriptionBox";
import ForumsSection from "../components/ForumsSection";
import AnimatedList from "../components/AnimatedList";
import Carousel from "../components/Carousel"
import PDF from "../components/PDF"
import "./HomePage.css";

//assets importaciones
import post1 from "../assets/estaticas/post1.jpg"
import post2 from "../assets/page_assets/mantenimiento.png"
import post3 from "../assets/estaticas/externas/xsiapasc.png"
import post4 from "../assets/estaticas/externas/siapabanner.png"
import mantenimiento from "../assets/page_assets/mantenimiento.png"
import simarlogo from "../assets/estaticas/externas/simarlogo.png"
import simarpreview from "../assets/estaticas/externas/simarpreview.png"
import pestatic from "../assets/estaticas/externas/estatico_1.png"
import pestatic_2 from "../assets/estaticas/externas/estatico_2.png"
import presentacion_pdf from "../assets/estaticas/documentos/pdf_01-1.png"
import banner_prestado from "../assets/estaticas/poolpvz.png"
import carouse2 from "../assets/estaticas/externas/inegi.png"
import banner_video from "../assets/estaticas/externas/Videos/medusonas.mp4"
import ninopepenando from "../assets/estaticas/placeholders/nino_pepenador.jpg"



function HomePage() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((r) => r.json())
      .then((d) => setApiMessage(d.message))
      .catch(() => {});
  }, []);

  return (
    <PageLayout>
      <Banner fullScreen backgroundImage={banner_prestado} backgroundVideo={banner_video} scrollToId="descripcion" title="AquaAlert" subtitle="Identifica, conoce y actúa"/>
      <div className="page-inner">
        <div></div>
        <DescriptionBox
          id="descripcion"
          title="¿Qué es Aqualert?" 
          description="Una plataforma dedicada a proporcionar información sobre el estado del agua en México."
        />
        <Carousel
          items={[
            {
              imagen: ninopepenando,
              descripcion: "Registros abiertos!",
              link: "/registro"
            },
            {
              imagen: carouse2,
              descripcion: "Mapas de hidrología de la INEGI",
              Link: "https://www.inegi.org.mx/temas/hidrologia/#mapas"
            }
            
          ]}
        />
        <ForumsSection/>
        <ItemContainer
        titulo="Publicaciones destacadas"
        items={[
          {imagen: mantenimiento , descripcion: "Los registros están actualmente en mantenimiento, agradecemos su comprensión y esperamos volver con el servicio pronto!", link: "/registro"},
          {imagen: post3, descripcion: "Recomendamos reportar fallas a SIAPA mediante X (twitter)", link: "https://x.com/siapagdl"},
          {imagen: post4, descripcion: "web oficial de SIAPA", link: "https://www.siapa.gob.mx/quejas-y-sugerencias"},
          {imagen: simarpreview , descripcion: "Simar web oficial", link: "https://simar.conabio.gob.mx/"},
          {imagen: pestatic, descripcion: "Tendencias en los cuerpos de agua a nivel nacional 2024", link: "https://www.biodiversidad.gob.mx/monitoreo/simoh-mx/cuerpos-de-agua"},
          {imagen: pestatic_2, descripcion: "Situación del agua en México por IMCO.org.mx", link: "https://imco.org.mx/situacion-del-agua-en-mexico/"}
        ]}
        />
        <PDF fallbackImage={presentacion_pdf} titulo="" height="100%"/>
      </div>
    </PageLayout>
  );
}

export default HomePage;