# [Videocuestionario KrowdyBootcamp](https://videocuestionario-krowdy-bootcamp.vercel.app/)

![Imagen del Proyecto](https://www.krowdy.com/images/seo/home.png)
Graba respuestas a 4 preguntas. Haz clic para grabar y otorga permisos. Pausa, reanuda y detén a los 2 minutos. Regrabar si es necesario y termina. Reproduce y envía tus respuestas.Personaliza con más preguntas en questions.json.

##[UI en Figma](https://www.figma.com/file/qqx6eaZ9vZNi6YMsSzyrKI/VOD?type=design&t=N8pgZwpoSTB7MWwE-6)

## Uso
Para utilizar la aplicación, siga estos pasos:

- Abra la aplicación en su navegador web visitando el enlace Videocuestionario KrowdyBootcamp .
- La aplicación le permite grabar videos basados ​​en un conjunto de preguntas. De forma predeterminada, hay 4 preguntas predefinidas disponibles.
- Para comenzar a grabar, haga clic en el botón "Grabar" (Grabar) al lado de una pregunta.
- Otorgue permiso para acceder a su cámara y micrófono si se le solicita.
- La grabación comenzará automáticamente y el temporizador indicará el tiempo transcurrido.
- Puede pausar y reanudar la grabación haciendo clic en el icono de pausa durante el proceso de grabación.
- La grabación se detendrá automáticamente después de 2 minutos.
- Si no está satisfecho con la grabación, puede hacer clic en el botón "Regrabar" (Volver a grabar) para comenzar de nuevo.
- Una vez que esté satisfecho con la grabación, haga clic en el botón "Terminar" (Terminar).
Puede navegar entre diferentes preguntas usando la lista de navegación en el lado izquierdo de la pantalla.
- En la vista de lista, puede reproducir los videos grabados haciendo clic en el icono de reproducción junto a cada pregunta.
- Puede enviar todos los videos apretando el boton "enviar".

Nota: La funcionalidad de la aplicación se puede ampliar modificando el questions.jsonarchivo ubicado en el /src/pagesdirectorio. Puede agregar o eliminar preguntas según lo desee.

## Principales funcionalidades
- Se pueda cambiar de vista
- Se pueda grabar
- Regrabar
- Detener
- Que detenga de forma automatica a los 2 minutos de grabacion
- Logica del boton terminar
- Reproducir video en la vista lista
- Configurable
- Solicitar permisos para grabar audio y video
- Enviar videos
- Retrocer a cualquier video en la vista video
- Ir a la siguiente pregunta por responder
  - Tener una estructura facil de modificar y se pueda extender a mas de las 4 preguntas que se solicito.

## Tecnologías
- WebRTC
- JavaScript
