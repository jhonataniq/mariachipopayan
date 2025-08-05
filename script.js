// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad del menú responsive mejorado
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navList = mainNav?.querySelector('ul');

    if (menuToggle && mainNav && navList) {
        // Función para abrir/cerrar menú (toggle)
        const toggleMenu = () => {
            const isOpen = navList.classList.contains('show');
            
            if (isOpen) {
                // Cerrar menú
                navList.classList.remove('show');
                menuToggle.classList.remove('active');
            } else {
                // Abrir menú
                navList.classList.add('show');
                menuToggle.classList.add('active');
            }
        };

        // Event listener para el botón hamburguesa
        menuToggle.addEventListener('click', toggleMenu);

        // Cerrar menú al hacer clic en un enlace
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    navList.classList.remove('show');
                    menuToggle.classList.remove('active');
                }, 200);
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && navList.classList.contains('show')) {
                navList.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.classList.contains('show')) {
                navList.classList.remove('show');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Funcionalidad del carrusel de fotos optimizado
    const carouselFotos = (() => {
        const contenido = document.querySelector('.carousel-content');
        const btnPrev = document.querySelector('.carousel-button.prev');
        const btnNext = document.querySelector('.carousel-button.next');
        
        if (!contenido) return;
        
        let posicionActual = 0;
        
      // Lista completa de imágenes organizadas por categorías
const imagenes = [
    // Imágenes principales del grupo
    { src: 'images/MariachiCiudadBlanca.webp', alt: 'Mariachi Ciudad Blanca - Grupo musical profesional en Popayán' },
    { src: 'images/Musico-Popayan-Cauca.webp', alt: 'Músico Popayán Cauca - Artista local especializado en mariachi' },
    
    // Bodas y eventos románticos
    { src: 'images/mariachis-bodas.webp', alt: 'Mariachi en bodas - Música romántica para el día más especial' },
    { src: 'images/mariachis-en-boda.webp', alt: 'Mariachi en boda - Serenata y música en vivo para bodas' },
    { src: 'images/mariachis-en-quinceaneras.webp', alt: 'Mariachi en quinceañeras - Celebración de 15 años con música tradicional' },
    
    // Cumpleaños y celebraciones familiares
    { src: 'images/mariachis-cumpleaños.webp', alt: 'Mariachi en cumpleaños - Música festiva para celebrar años de vida' },
    { src: 'images/mariachis-en-fiestas-de-cumpleanos.webp', alt: 'Mariachi en fiestas de cumpleaños - Ambiente festivo y alegre' },
    { src: 'images/mariachis-en-aniversarios.webp', alt: 'Mariachi en aniversarios - Celebración de años de amor' },
    
    // Eventos familiares y sociales
    { src: 'images/mariachis-en-eventos-familiares.webp', alt: 'Mariachi en eventos familiares - Música para reuniones familiares' },
    { src: 'images/mariachis-en-reuniones-sociales.webp', alt: 'Mariachi en reuniones sociales - Música para eventos sociales' },
    { src: 'images/mariachis-en-fiesta-privada.webp', alt: 'Mariachi en fiesta privada - Eventos exclusivos y privados' },
    
    // Eventos corporativos y empresariales
    { src: 'images/mariachis-en-evento-corporativo.webp', alt: 'Mariachi en evento corporativo - Música para empresas y organizaciones' },
    { src: 'images/mariachis-en-eventos-corporativos.webp', alt: 'Mariachi en eventos corporativos - Presentaciones empresariales' },
    { src: 'images/mariachis-en-fiestas-empresariales.webp', alt: 'Mariachi en fiestas empresariales - Celebración corporativa' },
    
    // Eventos culturales y festividades
    { src: 'images/mariachis-en-celebraciones-culturales.webp', alt: 'Mariachi en celebraciones culturales - Tradición y folclor' },
    { src: 'images/mariachis-en-festividades-populares.webp', alt: 'Mariachi en festividades populares - Fiestas tradicionales' },
    { src: 'images/mariachis-en-fiestas-patronales.webp', alt: 'Mariachi en fiestas patronales - Celebración religiosa y cultural' },
    { src: 'images/mariachis-en-fiestas-nacionales.webp', alt: 'Mariachi en fiestas nacionales - Patrias y celebraciones nacionales' },
    
    // Eventos religiosos y ceremonias
    { src: 'images/mariachis-en-eventos-religiosos.webp', alt: 'Mariachi en eventos religiosos - Ceremonias espirituales' },
    { src: 'images/mariachis-en-ceremonias-formales.webp', alt: 'Mariachi en ceremonias formales - Eventos protocolarios' },
    
    // Conciertos y presentaciones
    { src: 'images/mariachis-en-conciertos.webp', alt: 'Mariachi en conciertos - Presentaciones musicales en vivo' },
    { src: 'images/mariachis-en-desfiles.webp', alt: 'Mariachi en desfiles - Participación en eventos públicos' },
    
    // Cenas y eventos gastronómicos
    { src: 'images/mariachis-en-cena.webp', alt: 'Mariachi en cena - Música para eventos gastronómicos' }
];

        // Función para cargar las imágenes con lazy loading
        const cargarImagenes = () => {
            imagenes.forEach((imagen, index) => {
                const img = document.createElement('img');
                img.src = imagen.src; // Cargar inmediatamente para el carrusel
                img.alt = imagen.alt;
                img.classList.add('carousel-img');
                img.width = 800;
                img.height = 600;
                img.title = imagen.alt;
                contenido.appendChild(img);
            });
            
            // Agregar indicadores de navegación
            agregarIndicadores();
        };

        // Función para agregar indicadores de navegación
        const agregarIndicadores = () => {
            const carousel = document.querySelector('.carousel');
            if (!carousel) return;
            
            // Agregar contador de imágenes
            const contador = document.createElement('div');
            contador.className = 'carousel-counter';
            contador.textContent = `1 / ${imagenes.length}`;
            carousel.appendChild(contador);
            
            const indicadoresContainer = document.createElement('div');
            indicadoresContainer.className = 'carousel-indicators';
            
            imagenes.forEach((_, index) => {
                const indicador = document.createElement('button');
                indicador.className = 'carousel-indicator';
                indicador.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
                indicador.addEventListener('click', () => {
                    posicionActual = index;
                    actualizarCarrusel();
                });
                indicadoresContainer.appendChild(indicador);
            });
            
            carousel.appendChild(indicadoresContainer);
            actualizarIndicadores();
        };

        // Función para actualizar indicadores
        const actualizarIndicadores = () => {
            const indicadores = document.querySelectorAll('.carousel-indicator');
            const contador = document.querySelector('.carousel-counter');
            
            indicadores.forEach((indicador, index) => {
                if (index === posicionActual) {
                    indicador.classList.add('active');
                } else {
                    indicador.classList.remove('active');
                }
            });
            
            // Actualizar contador
            if (contador) {
                contador.textContent = `${posicionActual + 1} / ${imagenes.length}`;
            }
        };

        // Función para actualizar el carrusel
        const actualizarCarrusel = () => {
            contenido.style.transform = `translateX(-${posicionActual * 100}%)`;
            actualizarIndicadores();
        };

        // Función para mover el carrusel
        const moverCarrusel = (direccion) => {
            posicionActual += direccion;
            if (posicionActual < 0) posicionActual = imagenes.length - 1;
            if (posicionActual >= imagenes.length) posicionActual = 0;
            actualizarCarrusel();
        };

        // Event listeners para los botones
        if (btnPrev) btnPrev.addEventListener('click', () => moverCarrusel(-1));
        if (btnNext) btnNext.addEventListener('click', () => moverCarrusel(1));

        // Navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moverCarrusel(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                moverCarrusel(1);
            }
        });

        // Auto-play opcional (comentado por defecto)
        // let autoPlayInterval = setInterval(() => moverCarrusel(1), 5000);

        // Inicialización
        return {
            init: cargarImagenes
        };
    })();

    // Funcionalidad de la galería de videos optimizada
    const galeriaVideos = (() => {
        const contenedor = document.querySelector('.video-grid');
        
        if (!contenedor) return;
        
        // Videos de ejemplo (reemplazar con IDs reales de YouTube)
        const videosYoutube = [
            { id: 'VIDEO_ID_1', title: 'Mariachi Ciudad Blanca - Presentación' },
            { id: 'VIDEO_ID_2', title: 'Mariachi en boda - Evento especial' },
            { id: 'VIDEO_ID_3', title: 'Mariachi en quinceañera - Celebración' }
        ];

        const cargarVideos = () => {
            videosYoutube.forEach(video => {
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-item';
                
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${video.id}`;
                iframe.width = '100%';
                iframe.height = '315';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.title = video.title;
                iframe.loading = 'lazy';
                
                videoContainer.appendChild(iframe);
                contenedor.appendChild(videoContainer);
            });
        };

        return {
            init: cargarVideos
        };
    })();

    // Funcionalidad de navegación suave optimizada
    const navegacionSuave = (() => {
        const enlaces = document.querySelectorAll('nav a[href^="#"]');

        enlaces.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                const destino = document.querySelector(enlace.getAttribute('href'));
                if (destino) {
                destino.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                });
                // Cerrar el menú móvil después de hacer clic en un enlace
                    const menu = document.querySelector('#main-nav ul');
                    if (menu) menu.classList.remove('show');
                }
            });
        });
    })();

    // Animación de entrada optimizada para las secciones
    const animacionEntrada = (() => {
        const secciones = document.querySelectorAll('section');

        if (!secciones.length) return;

        const opciones = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observador = new IntersectionObserver((entradas, observador) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible');
                    observador.unobserve(entrada.target);
                }
            });
        }, opciones);

        secciones.forEach(seccion => {
            observador.observe(seccion);
        });
    })();

    // Funcionalidad del botón "Volver arriba"
    const botonVolverArriba = (() => {
        const boton = document.getElementById('backToTop');
        
        if (!boton) return;
        
        // Mostrar/ocultar botón según scroll
        const toggleBoton = () => {
            if (window.scrollY > 300) {
                boton.classList.add('visible');
            } else {
                boton.classList.remove('visible');
            }
        };
        
        // Scroll suave hacia arriba
        const volverArriba = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        
        // Event listeners
        window.addEventListener('scroll', toggleBoton);
        boton.addEventListener('click', volverArriba);
    })();

    // Inicialización de componentes
    if (carouselFotos) carouselFotos.init();
    if (galeriaVideos) galeriaVideos.init();

    // navegacionSuave, animacionEntrada, formularioContacto y botonVolverArriba se auto-inicializan

    // Manejo de errores mejorado
    window.addEventListener('error', (e) => {
        console.error('Error en la aplicación:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promesa rechazada no manejada:', e.reason);
    });
});