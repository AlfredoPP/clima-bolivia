Clima Bolivia

Aplicación web para consultar el pronóstico del clima de los próximos 7 días en las nueve ciudades capitales departamentales de Bolivia.

Ciudades disponibles
Sucre — Chuquisaca
La Paz 
Cochabamba
Oruro 
Potosí
Tarija
Santa Cruz de la Sierra
Trinidad — Beni
Cobija — Pando
Funcionalidades
Consulta del pronóstico meteorológico de los próximos 7 días.
Selección entre las 9 ciudades capitales departamentales.
Visualización de:
Fecha.
Temperatura máxima.
Temperatura mínima.
Condición climática.
Traducción de códigos meteorológicos WMO a descripciones comprensibles.
Estado de carga durante las consultas.
Manejo de errores al consumir la API.
Opción para reintentar una consulta fallida.
Diseño responsive para escritorio, tablet y móvil.
Scroll automático hacia el pronóstico al seleccionar una ciudad en dispositivos móviles.
Respeto de la preferencia prefers-reduced-motion del sistema para el desplazamiento automático.
Tecnologías utilizadas
React
TypeScript
Vite
CSS
Fetch API
Open-Meteo API

No se utilizó un backend propio porque la aplicación solamente necesita consumir información pública de clima y no maneja autenticación, datos privados ni persistencia. Para el alcance del desafío, agregar un servidor intermedio habría introducido complejidad sin aportar suficiente valor.

API utilizada

Se utilizó Open-Meteo Forecast API.

La aplicación consulta el endpoint de pronóstico utilizando las coordenadas de cada ciudad y solicita:

weather_code
temperature_2m_max
temperature_2m_min

También se solicita un pronóstico de 7 días y se utiliza la zona horaria America/La_Paz.

¿Por qué Open-Meteo?

Elegí Open-Meteo porque ofrece una API sencilla basada en HTTP y JSON y, para el uso no comercial requerido por este desafío, no necesita API key ni registro.

Esto permite ejecutar el proyecto localmente y publicar el código en un repositorio público sin tener que almacenar credenciales o secretos en el frontend.

Además, permite solicitar directamente las variables diarias necesarias para el desafío mediante coordenadas geográficas.

Ventajas
No requiere API key para el uso no comercial de este proyecto.
Integración sencilla mediante HTTP y JSON.
Permite consultar directamente por latitud y longitud.
Proporciona temperaturas máximas y mínimas diarias.
Proporciona códigos meteorológicos WMO para representar las condiciones del clima.
Evita incluir secretos o credenciales en el repositorio.
Limitaciones
El pronóstico depende de la disponibilidad y precisión de un servicio externo.
Las condiciones meteorológicas se reciben como códigos WMO y deben ser interpretadas por la aplicación.
Al tratarse de información obtenida mediante modelos meteorológicos y coordenadas geográficas, los valores representan un pronóstico y no mediciones exactas para cada punto de una ciudad.
Si Open-Meteo no está disponible o existe un problema de red, la aplicación no puede actualizar el pronóstico. Por este motivo se implementó un estado de error y una opción para reintentar.
Decisiones técnicas principales
React + TypeScript

React permite dividir la interfaz en componentes pequeños y mantener de forma sencilla el estado de la ciudad seleccionada, el pronóstico, la carga y los errores.

TypeScript fue utilizado para definir los contratos de ciudades, respuestas de la API y datos utilizados por la interfaz, ayudando a detectar errores durante el desarrollo.

Vite

Se utilizó Vite para disponer de un entorno de desarrollo pequeño, rápido y con una configuración mínima para React y TypeScript.

Sin backend

Decidí consumir Open-Meteo directamente desde el frontend. No existen credenciales que necesiten ser protegidas ni lógica de servidor necesaria para cumplir los requisitos.

Agregar un backend únicamente como proxy de la API habría aumentado innecesariamente la complejidad del proyecto.

Separación entre API y UI

La respuesta externa de Open-Meteo se transforma en weather.service.ts al modelo DailyForecast utilizado por la aplicación.

De esta manera, los componentes de la interfaz no dependen directamente de la estructura completa de la API externa.

Ciudades definidas localmente

Las nueve ciudades y sus coordenadas están definidas en data/cities.ts.

Como el conjunto de ciudades es fijo por definición del desafío, realizar una segunda consulta a una API de geocodificación habría agregado una dependencia externa innecesaria.

Manejo de códigos meteorológicos

Open-Meteo devuelve códigos meteorológicos WMO. La función ubicada en utils/weatherCode.ts transforma esos códigos en una descripción en español y una representación visual sencilla.

Responsive y experiencia móvil

En escritorio se muestran varias ciudades y días simultáneamente.

En pantallas pequeñas el contenido se reorganiza verticalmente. Además, al seleccionar una ciudad, la aplicación desplaza automáticamente la vista hacia el pronóstico para evitar que el usuario tenga que recorrer manualmente toda la lista de ciudades.

El desplazamiento respeta prefers-reduced-motion para usuarios que tienen reducidas las animaciones en su sistema.

## Demo

La aplicación está desplegada públicamente en Vercel:

https://clima-bolivia.vercel.app/

## Repositorio

Código fuente disponible en GitHub:

https://github.com/AlfredoPP/clima-bolivia

Estructura del proyecto
src/
├── components/
│   └── ForecastCard.tsx
├── data/
│   └── cities.ts
├── services/
│   └── weather.service.ts
├── types/
│   ├── city.ts
│   └── weather.ts
├── utils/
│   └── weatherCode.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
Cómo ejecutar el proyecto
Requisitos
Node.js
npm
Instalación

Clonar el repositorio:

git clone [<URL-DEL-REPOSITORIO>](https://github.com/AlfredoPP/clima-bolivia.git)

Entrar al proyecto:

cd clima-bolivia

Instalar las dependencias:

npm install

Iniciar el servidor de desarrollo:

npm run dev

Vite mostrará la dirección local donde se encuentra disponible la aplicación.

Build de producción
npm run build

El resultado de producción se genera en el directorio dist.

Manejo de errores

Las solicitudes verifican el estado HTTP antes de procesar la respuesta.

También se valida que la respuesta contenga los arreglos necesarios para construir el pronóstico.

Si ocurre un error de red, una respuesta HTTP incorrecta o una estructura inesperada, la interfaz muestra un mensaje de error y permite volver a ejecutar la consulta mediante el botón Reintentar.

Durante el desarrollo este comportamiento fue probado deliberadamente utilizando temporalmente un endpoint inválido y restaurando posteriormente el endpoint correcto para comprobar también la recuperación de la aplicación.

AI Usage
Herramientas utilizadas

Utilicé ChatGPT (GPT-5.6 Sol) como herramienta de apoyo durante el desarrollo.

¿Para qué utilicé IA?

La utilicé principalmente para:

Analizar los requisitos del desafío.
Evaluar alternativas de arquitectura.
Comparar la conveniencia de utilizar Open-Meteo frente a una API que requiriera credenciales.
Proponer una estructura inicial para el proyecto.
Generar y revisar fragmentos de React, TypeScript y CSS.
Analizar errores del compilador.
Revisar el comportamiento responsive.
Pensar escenarios de error y formas de probarlos.
Estructurar la documentación del proyecto.
¿Cómo utilicé IA durante el desarrollo?

Trabajé de forma iterativa.

En lugar de solicitar la aplicación completa y utilizar el resultado directamente, fui implementando pequeñas partes, ejecutando el proyecto y utilizando TypeScript, el navegador y el build de producción para comprobar cada cambio.

Cuando aparecía un problema, compartía el error o el comportamiento observado con la IA, analizaba la propuesta de solución y posteriormente volvía a probarla.

La IA fue utilizada como asistente de desarrollo, no como sustituto de la validación del resultado.

Ejemplo de una sugerencia de IA que tuve que revisar o corregir

Durante la implementación, un bloque destinado a App.tsx terminó integrado en ForecastCard.tsx.

TypeScript detectó inmediatamente varios imports inválidos y un parámetro con tipo implícito any.

En lugar de modificar la configuración de TypeScript o ignorar los errores, revisé la estructura de los archivos, identifiqué que el código se encontraba en el archivo incorrecto y separé nuevamente las responsabilidades entre App.tsx y ForecastCard.tsx.

Este caso fue útil para comprobar que incluso código generado correctamente puede fallar durante su integración y que las sugerencias de IA deben ser verificadas.

Parte que requirió más razonamiento y decisiones propias

Una de las principales decisiones fue definir cuánto debía abarcar la arquitectura.

Era posible crear un backend, agregar una API de geocodificación, utilizar una librería de estado global o incorporar más dependencias visuales.

Decidí no hacerlo porque los requisitos no lo justificaban, para un app Web sencilla.

El conjunto de ciudades es fijo, Open-Meteo puede consumirse sin exponer credenciales y el estado de la aplicación es pequeño. Por ello prioricé una solución frontend simple y con responsabilidades claramente separadas.

También fue importante probar la interfaz en un viewport móvil real. La primera versión funcionaba correctamente en escritorio, pero durante la prueba responsive detecté desbordamiento horizontal. El CSS fue corregido y posteriormente se agregó scroll automático al pronóstico al seleccionar una ciudad para mejorar la experiencia móvil.

Sugerencias de IA que decidí no utilizar

Consideré utilizar una librería adicional de iconos meteorológicos, pero decidí no incorporarla.

Para el alcance de esta aplicación, agregar una dependencia únicamente para representar un conjunto pequeño de condiciones climáticas no aportaba suficiente valor. Preferí mantener una representación visual sencilla y reducir las dependencias.

También descarté crear un backend únicamente para actuar como intermediario con Open-Meteo, ya que no existen secretos que proteger ni lógica de servidor necesaria para este desafío.

Validaciones realizadas

Durante el desarrollo se comprobó:

Compilación de TypeScript.
Build de producción con Vite.
Consulta de las nueve ciudades.
Cambio de pronóstico al seleccionar distintas ciudades.
Visualización de siete días.
Temperaturas máximas y mínimas.
Traducción de condiciones meteorológicas.
Estado de carga.
Error de API provocado deliberadamente.
Recuperación mediante el botón Reintentar.
Visualización responsive.
Navegación móvil hacia el pronóstico después de seleccionar una ciudad.
Posibles mejoras futuras

Si el alcance del proyecto creciera, algunas mejoras posibles serían:

Pruebas automatizadas unitarias y de componentes.
Caché temporal de pronósticos para evitar consultas repetidas.
Más información meteorológica, como probabilidad de precipitación o viento.
Iconografía meteorológica propia o consistente entre plataformas.
Mejoras adicionales de accesibilidad.
Pruebas end-to-end para los principales flujos.
Autor

Desarrollado como parte de un desafío técnico de selección Digital Academy.