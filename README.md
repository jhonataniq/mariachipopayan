# Mariachi Ciudad Blanca - Sitio Web

Sitio web profesional para Mariachi Ciudad Blanca, servicios de música en vivo en Popayán, Cauca.

## 🚀 Características

### ✅ Optimización de Velocidad

- **Lazy loading** de imágenes
- **Service Worker** para cache offline
- **PWA capabilities** (Progressive Web App)
- **Preload** de recursos críticos
- **Compresión** y optimización de recursos

### ✅ SEO Optimizado

- **Meta tags** completos (Open Graph, Twitter Cards)
- **Schema markup** para negocio local
- **Sitemap.xml** y robots.txt
- **URLs amigables** y estructura semántica
- **Local SEO** para Popayán, Cauca

### ✅ Funcionalidades

- **Carrusel de imágenes** con 30 fotos
- **Formulario de contacto** con validación
- **Sección FAQ** interactiva
- **Navegación suave** y botón "Volver arriba"
- **Diseño responsive** completo

### ✅ Analytics y Tracking

- **Google Analytics 4** integrado
- **Event tracking** para interacciones
- **Performance monitoring**
- **Conversion tracking**

## 📁 Estructura del Proyecto

```
Sitio web mariachi/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript principal
├── robots.txt              # Control de rastreo
├── sitemap.xml             # Mapa del sitio
├── security-headers.txt    # Cabeceras de seguridad
├── optimization-config.json # Configuración de optimizaciones
├── README.md               # Documentación
└── images/                 # Carpeta de imágenes
    ├── *.jpg               # Imágenes del carrusel
    └── logonegro.ico       # Favicon
```

## 🛠️ Configuración

### 1. Google Analytics

Reemplazar `GA_MEASUREMENT_ID` en `index.html` con tu ID de Google Analytics 4.

### 2. Enlaces de Redes Sociales

Los enlaces están configurados en:

- `index.html` (formulario de contacto y footer)
- Schema markup en `index.html`

### 3. Formulario de Contacto

**IMPORTANTE**: El formulario actualmente usa una solución temporal que abre WhatsApp con los datos. Para implementar envío real de emails, tienes estas opciones:

#### Opción 1: EmailJS (Recomendada)

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar servicio de email (Gmail, Outlook, etc.)
3. Crear template de email
4. Descomentar el código EmailJS en `script.js`
5. Reemplazar `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_USER_ID`

#### Opción 2: Formspree (Gratuita)

1. Crear cuenta en [Formspree](https://formspree.io/)
2. Crear formulario y obtener Form ID
3. Descomentar el código Formspree en `script.js`
4. Reemplazar `YOUR_FORM_ID`

#### Opción 3: WhatsApp (Actual - Temporal)

- Los datos se envían directamente a WhatsApp
- No requiere configuración adicional
- Funciona inmediatamente

## 📱 Características

### Instalación

- **Diseño responsive** para todos los dispositivos
- **Optimización móvil** completa
- **Navegación táctil** optimizada

### Funcionalidades

- **Carga rápida** de recursos críticos
- **Lazy loading** de imágenes
- **Navegación suave** entre secciones

## 🔒 Seguridad

### Cabeceras Implementadas

- **Content Security Policy** (CSP)
- **X-Frame-Options**
- **X-Content-Type-Options**
- **X-XSS-Protection**
- **Referrer Policy**
- **Permissions Policy**

### Configuración

Ver archivo `security-headers.txt` para configuración del servidor.

## 📊 Analytics

### Eventos Trackeados

- **contacto_clic**: Clics en teléfono, email, WhatsApp
- **formulario_enviado**: Envío del formulario de contacto
- **carrusel_navegacion**: Navegación en el carrusel
- **faq_abierto**: Apertura de preguntas FAQ
- **seccion_vista**: Visualización de secciones
- **red_social_clic**: Clics en redes sociales

### Performance Tracking

- **Tiempo de carga** de la página
- **Métricas de rendimiento** automáticas

## 🎨 Personalización

### Colores

Variables CSS en `styles.css`:

```css
:root {
  --color-principal: #8b0000; /* Rojo mariachi */
  --color-secundario: #ffd700; /* Dorado */
  --color-fondo: #fff5e6; /* Beige claro */
  --color-texto: #333; /* Gris oscuro */
}
```

### Imágenes

- **Hero image**: `images/mariachis-en-fiestas-patronales.jpg`
- **Carrusel**: 30 imágenes en `images/`
- **Favicon**: `images/logonegro.ico`

## 📈 Optimizaciones Implementadas

### Fase 1: Optimización Crítica

- ✅ Lazy loading de imágenes
- ✅ Meta tags SEO completos
- ✅ Schema markup
- ✅ Archivos robots.txt y sitemap.xml

### Fase 2: Funcionalidad Core

- ✅ Formulario de contacto funcional
- ✅ Navegación optimizada
- ✅ Botón "Volver arriba"

### Fase 3: Contenido y Marketing

- ✅ Sección "Sobre Nosotros"
- ✅ FAQ interactivo
- ✅ Enlaces de redes sociales
- ✅ Local SEO mejorado

### Fase 4: Optimizaciones Avanzadas

- ✅ Service Worker y PWA
- ✅ Google Analytics 4
- ✅ Tracking de eventos
- ✅ Cabeceras de seguridad

## 🚀 Despliegue

### Requisitos del Servidor

- **HTTPS** obligatorio para PWA
- **Compresión Gzip** habilitada
- **Cabeceras de seguridad** configuradas
- **Cache headers** para recursos estáticos

### Recomendaciones

- **CDN** para recursos estáticos
- **Backup automático** del sitio
- **Monitoreo** de uptime
- **SSL/TLS** actualizado

## 📞 Soporte

Para soporte técnico o modificaciones:

- **Email**: mariachiciudadblanca@gmail.com
- **WhatsApp**: +57 310 517 43 82

## 📄 Licencia

© 2024 Mariachi Ciudad Blanca. Todos los derechos reservados.

---

**Desarrollado con optimización SEO y rendimiento para máxima visibilidad en Popayán, Cauca.**
