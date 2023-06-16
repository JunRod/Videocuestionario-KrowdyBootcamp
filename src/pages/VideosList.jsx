import { useEffect, useRef, useState } from "react";
import { ToasterComponent } from "../components/Toaster";
import { toast } from "sonner";
import questions from "./questions.json";

import { ListaVideosComponent } from "../components/ListaVideosComponent";
import { ReturnIcon } from "../components/ReturnIcon";
import { RecordingComponent } from "../components/RecordingComponent";
import { VideoPlayer } from "../components/VideoPlayer";
import { Recorder } from "../components/Recorder";
import { ButtonSiguienteTerminarEnviar } from "../components/ButtonSiguienteTerminarEnviar";
import { ButtonAtras } from "../components/ButtonAtras";
import { Question } from "../components/Question";

let mediaRecorder;
let config = { audio: true, video: true };
let stream;
const maxRecordingTime = 120; // = 2 minutos

export const VideosList = () => {
  const [lastEmptyIndex, setLastEmptyIndex] = useState(-1);
  const [textBtnNext, setTextBtnNext] = useState("Enviar");
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoLocalSrc, setVideoLocalSrc] = useState(null);
  const [recording, setRecording] = useState(() =>
    Object.keys(questions).map(() => false)
  );
  const [position, setPosition] = useState(null);
  const [blobs, setBlobs] = useState([]);
  const [urls, setUrls] = useState(() =>
    Object.keys(questions).map(() => null)
  );
  const videoRef = useRef(null);
  const [stop, setStop] = useState(false);


  const startRecording = async () => {
    setVideoLocalSrc(stream);

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.start();

    mediaRecorder.addEventListener("dataavailable", (event) => {
      setBlobs((prevUrls) => {
        const newArray = [...prevUrls];
        newArray[position] = event.data;
        return newArray;
      });
    });
  };

  const requestCameraPermission = async () => {
    stream = await navigator.mediaDevices.getUserMedia(config);
    startRecording();
  };

  const deleteVideoInPosition = () => {
    if (urls[position]) {
      urls[position] = null;
    }
  }

  const permissionsNotGranted = () => {
    setRecording(recording.map((value) => value === true ? false : value))
        setPosition(null)
        toast("El usuario no ha otorgado permiso para acceder a la cámara y audio")
  }

  const stopRecording = () => {
    mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
  }

  useEffect(() => {
    if (recording[position]) {

      if (confirm("¿Deseas encender la cámara y audio para grabar?")) {
        //Si existe la url de la posicion x en el array de urls, eliminarlo para volver a generar nuevo video
        deleteVideoInPosition()
        requestCameraPermission()

      } else {
        permissionsNotGranted()
        return
      }
    }

    //Si mediaRecorder tiene algo (evita que se ejecute éste bloque al iniciar por primera vez), Detiene la grabación
    if (mediaRecorder) {
      stopRecording()
    }
  }, [recording[position]]);

  //Introduce el video grabado en Recorder
  useEffect(() => {
    if (videoLocalSrc !== null && videoRef.current !== null) {
      videoRef.current.srcObject = videoLocalSrc;
    }
  }, [videoLocalSrc]);

  //Transforma los blobs en urls y los guarda en el state de urls
  useEffect(() => {
    setUrls((prevUrls) => {
      const newArray = [...prevUrls];
      if (blobs[position]) {
        newArray[position] = URL.createObjectURL(blobs[position]);
      }
      return newArray;
    });
  }, [blobs[position]]);

  //Minutos y secundos
  useEffect(() => {
    let interval;

    if (recording[position]) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => {
          if (prevTime === maxRecordingTime) {
            recording[position] = !recording[position];
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      setRecordingTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [recording[position]]);

  useEffect(() => {
    //Si todas las urls están llenos
    if (urls.every((url) => url !== null)) {
      setTextBtnNext("Terminar");

      //Si todos los campos de urls están llenos y Position es Null (Mostrando lista)
      if (position === null) {
        setTextBtnNext("Enviar");
      }
    } else {
      if (position === null) {
        setTextBtnNext("Enviar");
      }
    }
  }, [urls]);

  //Si position tiene un index significa que hay un video mostrando: Imprimir "Siguiente" en boton
  useEffect(() => {
    if (position !== null) {
      setTextBtnNext("Siguiente");
    }
  }, [position]);

  //Para saber que video se está (re)grabando o pausando
  const _handleRecordPause = (index) => {
    setRecording((prevRecording) => {
      const newArray = [...prevRecording];
      newArray[index] = !newArray[index];
      return newArray;
    });

    setPosition(index);
  };

  const _handleListVideos = () => {
    setPosition(null);
  };

  //Filtramos las posiciones vacias del state urls o null si están llenos
  const filterEmptys = () => {
    const indexSave = urls.findIndex(
      (url, index) => url === null && index > lastEmptyIndex
    );

    if (indexSave !== -1) {
      setPosition(indexSave);
      setLastEmptyIndex(indexSave);
    } else {
      // Si no se encuentra una posición vacía después del último índice vacío encontrado,
      // se vuelve a buscar desde el principio del array
      const newIndexSave = urls.findIndex(
        (url, index) => url === null && index <= lastEmptyIndex
      );

      if (newIndexSave !== -1) {
        setPosition(newIndexSave);
        setLastEmptyIndex(newIndexSave);
      }
    }
  };

  //Funcionalidades del Boton: Filtrar "emptys" de urls o ir a la lista de videos o notificacion
  const _handleButtonFunctions = () => {
    filterEmptys();

    if (textBtnNext === "Terminar") {
      setPosition(null);
    }

    if (textBtnNext === "Enviar") {
      toast("Tu videocuestionario fue enviado con exito");
    }
  };

  //Retroceder al videopregunta anterior
  const _handleBack = () => {
    setStop(true);
    if (position - 1 < 0) {
      return setPosition(3);
    }
    return setPosition(position - 1);
  };

  return (
    <>
      <ToasterComponent />
      <div className="container">
        {position !== null ? (
          <nav>
            <ListaVideosComponent
              recording={recording}
              position={position}
              _handleListVideos={_handleListVideos}
            />
            <div className="lineDecoration" />
          </nav>
        ) : (
          <></>
        )}

        <header>
          <h1>VIDEOCUESTIONARIO</h1>
        </header>

        <main
          className={`containerVideoList ${position !== null && "oneGrid" }`
        }
        >
          {Object.keys(questions)
            .filter((question, index) => {
              if (position !== null) {
                return position === index && question;
              }
              return question;
            })
            .map((question) => {
              const index = Number(question);

              return (
                <div className="video" key={question}>
                  <div className="videoNav">
                    <ReturnIcon
                      urls={urls}
                      index={index}
                      recording={recording}
                      _handleRecordPause={_handleRecordPause}
                    />

                    {recording[position] && (
                      <RecordingComponent
                        recordingTime={recordingTime}
                        maxRecordingTime={maxRecordingTime}
                      />
                    )}
                  </div>

                  {recording[index] && <Recorder videoRef={videoRef} />}
                  <VideoPlayer
                    stop={stop}
                    index={index}
                    recording={recording}
                    urls={urls}
                    position={position}
                  />

                  <Question questions={questions} question={question} />
                </div>
              );
            })}
        </main>

        <div className="containerButtons">
          <ButtonAtras
            position={position}
            recording={recording}
            _handleBack={_handleBack}
          />

          <ButtonSiguienteTerminarEnviar
            recording={recording}
            position={position}
            _handleButtonFunctions={_handleButtonFunctions}
            textBtnNext={textBtnNext}
            urls={urls}
          />
        </div>
      </div>
    </>
  );
};
