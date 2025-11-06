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

    // Funcionalidad del carrusel de fotos optimizado (carga bajo demanda)
    const carouselFotos = (() => {
        const contenido = document.querySelector('.carousel-content');
        const btnPrev = document.querySelector('.carousel-button.prev');
        const btnNext = document.querySelector('.carousel-button.next');
        if (!contenido) return;
        let posicionActual = 0;

        // Lista completa de imágenes organizadas por categorías (no se inyectan hasta que sea visible)
const imagenes = [
    // Imágenes principales del grupo de mariachis en Popayán cauca
    { src: 'images/MariachiCiudadBlanca.webp', alt: 'Mariachi Ciudad Blanca - Grupo musical mariachis en Popayán' },
    { src: 'images/Musico-Popayan-Cauca.webp', alt: 'Músico Popayán Cauca - Artistas locales especializados en mariachi' },
    
    // Bodas y eventos románticos
    { src: 'images/mariachis-bodas.webp', alt: 'Mariachi en bodas Popayán cauca- Música romántica para el día más especial' },
    { src: 'images/mariachis-en-boda.webp', alt: 'Mariachi en boda popayan- Serenata y música en vivo para bodas' },
    { src: 'images/mariachis-en-quinceaneras.webp', alt: 'Mariachi en quinceañeras - Celebración de 15 años con música tradicional' },
    
    // Cumpleaños y celebraciones familiares
    { src: 'images/mariachis-cumpleaños.webp', alt: 'Mariachis en cumpleaños Popayán cauca - Música festiva para celebrar cumpleaños de vida' },
    { src: 'images/mariachis-en-fiestas-de-cumpleanos.webp', alt: 'Mariachi en fiestas de cumpleaños - Ambiente festivo y alegre' },
    { src: 'images/mariachis-en-aniversarios.webp', alt: 'Mariachi en aniversarios Popayán cauca - Celebración de años de amor' },
    
    // Eventos familiares y sociales musicos en popayán cauca 
    { src: 'images/mariachis-en-eventos-familiares.webp', alt: 'Mariachi en eventos familiares cauca- Música para reuniones familiares' },
    { src: 'images/mariachis-en-reuniones-sociales.webp', alt: 'Mariachi en reuniones sociales cauca- Música para eventos sociales' },
    { src: 'images/mariachis-en-fiesta-privada.webp', alt: 'Mariachis en fiesta privada - Eventos exclusivos y privados' },
    
    // Eventos corporativos y empresariales con mariachis en popayán
    { src: 'images/mariachis-en-evento-corporativo.webp', alt: 'Mariachi en evento corporativo - Música para empresas y organizaciones' },
    { src: 'images/mariachis-en-eventos-corporativos.webp', alt: 'Mariachis en eventos corporativos  Popayán cauca	- Presentaciones empresariales' },
    { src: 'images/mariachis-en-fiestas-empresariales.webp', alt: 'Mariachi en fiestas empresariales - Celebración corporativa' },
    
    // Eventos culturales y festividades
    { src: 'images/mariachis-en-celebraciones-culturales.webp', alt: 'Mariachi en celebraciones culturales - Tradición y folclor' },
    { src: 'images/mariachis-en-festividades-populares.webp', alt: 'Mariachi en festividades populares - Fiestas tradicionales' },
    { src: 'images/mariachis-en-fiestas-patronales.webp', alt: 'Mariachi en fiestas patronales - Celebración religiosa y cultural' },
    { src: 'images/mariachis-en-fiestas-nacionales.webp', alt: 'Mariachi en fiestas nacionales - Patrias y celebraciones nacionales' },
    
    // Eventos religiosos y ceremonias mariachi en popayán
    { src: 'images/mariachis-en-eventos-religiosos.webp', alt: 'Mariachi cristianos popayan cauca - Ceremonias espirituales' },
    { src: 'images/mariachis-en-ceremonias-formales.webp', alt: 'Mariachi en ceremonias formales - Eventos protocolarios' },
    
    // Conciertos y presentaciones serenatas en popayán
    { src: 'images/mariachis-en-conciertos.webp', alt: 'Mariachi en conciertos - Presentaciones musicales en vivo' },
    { src: 'images/mariachis-en-desfiles.webp', alt: 'Mariachi en desfiles - Participación en eventos públicos' },
    
    // Cenas y eventos gastronómicos
    { src: 'images/mariachis-en-cena.webp', alt: 'Mariachi en cena - Música para eventos gastronómicos' }
];

        // Cargar imágenes solo cuando el carrusel sea visible
        const cargarImagenes = () => {
            if (contenido.childElementCount > 0) return;
            imagenes.forEach((imagen) => {
                const img = document.createElement('img');
                img.src = imagen.src;
                img.alt = imagen.alt;
                img.classList.add('carousel-img');
                img.width = 800;
                img.height = 600;
                img.title = imagen.alt;
                img.loading = 'lazy';
                contenido.appendChild(img);
            });
            agregarIndicadores();
            if (btnPrev) btnPrev.addEventListener('click', () => moverCarrusel(-1));
            if (btnNext) btnNext.addEventListener('click', () => moverCarrusel(1));
            document.addEventListener('keydown', keyHandler);
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

        // Navegación por teclado (solo cuando el carrusel fue inicializado)
        const keyHandler = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moverCarrusel(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                moverCarrusel(1);
            }
        };

        // Auto-play opcional (comentado por defecto)
        // let autoPlayInterval = setInterval(() => moverCarrusel(1), 5000);

        // Inicialización diferida por intersección
        const init = () => {
            const carrusel = document.querySelector('.carousel');
            if (!carrusel) return;
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        cargarImagenes();
                        io.disconnect();
                    }
                });
            }, { rootMargin: '200px 0px' });
            io.observe(carrusel);
        };

        return { init };
    })();

    // Galería de videos: miniaturas con carga del iframe al hacer clic
    const galeriaVideos = (() => {
        const contenedor = document.querySelector('.video-grid');
        if (!contenedor) return;
        const videosYoutube = [
            { 
                id: 'o9C3h_Y3ncI', 
                title: 'Mariachi Ciudad Blanca en Popayán - Presentación Musical en Vivo',
                description: 'Presentación del Mariachi Ciudad Blanca con música ranchera en vivo en Popayán, Cauca'
            },
            { 
                id: '7IC0nmW4BUQ', 
                title: 'Mariachi en Boda Popayán - Música Romántica para Bodas',
                description: 'Mariachi Ciudad Blanca tocando en boda en Popayán con serenata romántica y música tradicional mexicana'
            },
            { 
                id: 'ZkppdukyRX0', 
                title: 'Mariachi en Evento Especial Popayán - Música Ranchera en Vivo',
                description: 'Presentación del mariachi en evento especial en Popayán con repertorio tradicional mexicano'
            },
            { 
                id: 'tZv8OdWMT7M', 
                title: 'Mariachi Ciudad Blanca - Serenata en Popayán Cauca',
                description: 'Serenata con mariachi en Popayán, música ranchera en vivo para eventos especiales'
            },
            { 
                id: 'KtFMlJ9YV7g', 
                title: 'Mariachi para Quinceañera Popayán - Celebración de 15 Años',
                description: 'Mariachi Ciudad Blanca en quinceañera en Popayán con música festiva y tradicional'
            },
            { 
                id: 'ORGd0C5kkJA', 
                title: 'Mariachi en Cumpleaños Popayán - Música para Fiestas',
                description: 'Presentación del mariachi en cumpleaños en Popayán con música alegre y festiva'
            },
            { 
                id: 'lEmzezY2jNw', 
                title: 'Mariachi en Evento Corporativo Popayán - Música para Empresas',
                description: 'Mariachi Ciudad Blanca en evento corporativo en Popayán, música profesional para empresas'
            },
            { 
                id: 'z-PlBS1EOXk', 
                title: 'Mariachi en Celebración Popayán - Música Tradicional Mexicana',
                description: 'Presentación del mariachi en celebración en Popayán con música tradicional mexicana en vivo'
            }
        ];

        const crearThumbnail = (video) => {
            const wrapper = document.createElement('article');
            wrapper.className = 'video-item-wrapper';
            
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'video-item';
            button.style.position = 'relative';
            button.style.backgroundImage = `url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)`;
            button.style.backgroundSize = 'cover';
            button.style.backgroundPosition = 'center';
            button.style.aspectRatio = '16 / 9';
            button.setAttribute('aria-label', `Reproducir video: ${video.title}`);

            const play = document.createElement('span');
            play.style.position = 'absolute';
            play.style.inset = '0';
            play.style.display = 'flex';
            play.style.alignItems = 'center';
            play.style.justifyContent = 'center';
            play.style.background = 'rgba(0,0,0,0.25)';
            play.style.color = '#fff';
            play.style.fontSize = '48px';
            play.textContent = '▶';
            button.appendChild(play);

            const title = document.createElement('h4');
            title.className = 'video-title';
            title.textContent = video.title;
            wrapper.appendChild(title);

            if (video.description) {
                const description = document.createElement('p');
                description.className = 'video-description';
                description.textContent = video.description;
                wrapper.appendChild(description);
            }

            button.addEventListener('click', () => {
                // Obtener el origen actual para ayudar con CORS
                const origin = window.location.origin || 'https://www.mariachipopayan.com';
                
                const iframe = document.createElement('iframe');
                // Parámetros mejorados para evitar errores de YouTube
                // enablejsapi=1: Habilita la API de JavaScript
                // origin: Ayuda con restricciones CORS
                // rel=0: No mostrar videos relacionados
                // modestbranding=1: Menos branding de YouTube
                iframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&origin=${encodeURIComponent(origin)}`;
                iframe.className = 'video-item';
                iframe.style.width = '100%';
                iframe.style.aspectRatio = '16 / 9';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                iframe.setAttribute('allowfullscreen', '');
                iframe.title = video.title;
                iframe.setAttribute('loading', 'lazy');
                iframe.setAttribute('aria-label', `Video: ${video.title}`);
                
                // Manejo de errores: si hay un problema, redirigir a YouTube
                iframe.addEventListener('error', () => {
                    console.warn('Error al cargar el iframe, redirigiendo a YouTube');
                    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
                });
                
                button.replaceWith(iframe);
            });

            wrapper.appendChild(button);
            return wrapper;
        };

        const cargarThumbnails = () => {
            if (contenedor.childElementCount > 0) return;
            videosYoutube.forEach(video => {
                contenedor.appendChild(crearThumbnail(video));
            });
        };

        const init = () => {
            const seccionVideos = document.querySelector('.galeria-videos');
            if (!seccionVideos) return;
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        cargarThumbnails();
                        io.disconnect();
                    }
                });
            }, { rootMargin: '200px 0px' });
            io.observe(seccionVideos);
        };

        return { init };
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

    // Animación de entrada optimizada (inicializar en idle)
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

    // Funcionalidad del botón "Volver arriba" (inicializar en idle)
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

    // FAQ Functionality (ligero, mantener)
(function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Cerrar todas las respuestas
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Abrir la respuesta clickeada si no estaba activa
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
})();

    // Inicialización de componentes diferida
    if (carouselFotos) carouselFotos.init();
    if (galeriaVideos) galeriaVideos.init();

    // navegacionSuave se auto-inicializa
    // Inicializaciones no críticas en idle
    const deferIdle = (cb) => {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(cb, { timeout: 1500 });
        } else {
            setTimeout(cb, 300);
        }
    };

    deferIdle(() => {
        // animacionEntrada y botonVolverArriba ya se evaluaron; nada pesado aquí
        // Este espacio queda para futuras tareas no críticas
    });

    // Manejo de errores mejorado
    window.addEventListener('error', (e) => {
        console.error('Error en la aplicación:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Promesa rechazada no manejada:', e.reason);
    });
});