# [Videocuestionario KrowdyBootcamp](https://videocuestionario-krowdy-bootcamp.vercel.app/)

## Principales funcionalidades
- Se pueda cambiar de vista
- Se pueda grabar
- Regrabar
- Detener
- Que detenga de forma automatica a los 2 minutos de grabacion
- Logica del boton terminar
- Reproducir video en la vista lista
- Configurable
  - Tener una estructura facil de modificar y se pueda extender a mas de las 4 preguntas que se solicito.

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

La aplicación se puede ejecutar localmente abriendo el proyecto en Visual Studio Code y ejecutándolo en un servidor local.

## Tecnologías
- WebRTC
- JavaScript