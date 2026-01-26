import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Logo from "../assets/Logo.png";
import { Link } from 'react-router-dom';
import './CardNav.css';

const CardNav = ({
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  logo,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
  const navEl = navRef.current;
  // Un valor base seguro por si algo falla antes de montar
  if (!navEl) return 320; 

  const contentEl = navEl.querySelector('.card-nav-content');
  if (!contentEl) return 320;

  // 1. Guardamos el estado actual para restaurarlo después
  const wasVisible = contentEl.style.visibility;
  const wasPointerEvents = contentEl.style.pointerEvents;
  const wasPosition = contentEl.style.position;
  const wasHeight = contentEl.style.height;
  const wasDisplay = contentEl.style.display;

  // 2. Hacemos el elemento "medible" temporalmente
  // (GSAP a veces lo tiene oculto, así que forzamos su visualización para leer la altura)
  contentEl.style.visibility = 'hidden'; // Oculto al ojo pero renderizado
  contentEl.style.position = 'absolute';
  contentEl.style.display = 'flex'; // Aseguramos que respete el flexbox
  contentEl.style.height = 'auto';

  // 3. Medimos la altura real del contenido interno
  const contentHeight = contentEl.scrollHeight;
  
  // 4. Restauramos los estilos originales inmediatamente
  contentEl.style.visibility = wasVisible;
  contentEl.style.pointerEvents = wasPointerEvents;
  contentEl.style.position = wasPosition;
  contentEl.style.height = wasHeight;
  contentEl.style.display = wasDisplay;

  // 5. Calculamos: Altura Barra Superior (60px) + Contenido + Un pequeño margen extra
  const topBarHeight = 60; 
  const paddingBottom = 10; // Un respiro extra al final para que no se vea apretado

  return topBarHeight + contentHeight + paddingBottom;
};

  const createTimeline = () => {
  const navEl = navRef.current;
  if (!navEl) return null;

  // Estado inicial tl
  gsap.set(navEl, { height: 60, overflow: 'hidden' });
  gsap.set(cardsRef.current, { y: 50, opacity: 0 });

  const tl = gsap.timeline({ 
    paused: true,
    // CUANDO TERMINE DE ABRIRSE: Permitir que el contenido salga (desplegables, sombras)
    onComplete: () => {
      gsap.set(navEl, { overflow: 'visible' });
    },
    // CUANDO EMPIECE A CERRARSE (REVERSA): Ocultar el desborde de nuevo
    onReverseStart: () => {
      gsap.set(navEl, { overflow: 'hidden' });
    }
  });

  tl.to(navEl, {
    height: calculateHeight, // Funcion de calculo
    duration: 0.25,
    ease
  });

  tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.25, ease, stagger: 0.05 }, '-=0.1');

  return tl;
};

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{  }}>
        <div className="card-nav-top">
            <div className="nav-left">
                <div
                className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                role="button"
                aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                tabIndex={0}
                style={{ color: menuColor || '#000' }}
                >
                    <div className="hamburger-line" />
                    <div className="hamburger-line" />
                </div>

            <div className="nav-buttons-container"/>
            {/*placeholder para logo*/}
                <button type="button" className="card-nav-logo-button" aria-label="volver a pagina principal">
                    <Link to="/" >
                      <img src={logo} alt="Logo"/>
                    </Link>
                </button>
            </div>
         

          <Link to="/registro" className="card-nav-cta-button" style={{ color: buttonTextColor }}>
            Unete
          </Link>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a key={`${lnk.label}-${i}`} className="nav-card-link" href={lnk.href} aria-label={lnk.ariaLabel}>
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;