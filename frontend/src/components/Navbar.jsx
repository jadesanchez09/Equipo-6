import React from "react";
import CardNav from "./CardNav";
import logo_new from "../assets/page_assets/logo.png"

const navItems = [
  {
    label: "Nosotros",
    bgColor: "#333446",
    textColor: "#EAEFEF",
    links: [
      { label: "Contacto", href: "/contacto", ariaLabel: "Ponte en contacto con nosotros" }
    ],
  },
  {
    label: "Mapas",
    bgColor: "#333446",
    textColor: "#EAEFEF",
    links: [
      { label: "Mapas Interactivos", href: "/mapas", ariaLabel: "Revisa mapas los mapas de organizaciones oficiales" }
    ],
  },
  {
    label: "FAQ",
    bgColor: "#333446",
    textColor: "#EAEFEF",
    links: [
      { label: "Preguntas Generales", href: "/FAQ", ariaLabel: "Lee las preguntas generales" },
      { label: "Soporte", href: "/soporte", ariaLabel: "Encuentra ayuda en soporte" },
    ],
  },
];

export default function Navbar() {
  return (
    <CardNav
      items={navItems}
      logo={logo_new}
      baseColor="rgba(30, 30, 42, 0.6)"
      menuColor="#EAEFEF"
      buttonBgColor="#7F8CAA"
      buttonTextColor="#EAEFEF"
    />
  );
}