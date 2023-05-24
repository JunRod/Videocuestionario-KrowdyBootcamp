import { useEffect, useRef, useState } from "react";
import { formatedTime } from "../helpers/formatSeconds";
import { ToasterComponent } from "../components/Toaster";
import { toast } from "sonner";
import questions from "./questions.json";

import { ListaVideosComponent } from "../components/ListaVideosComponent";
import { ReturnIcon } from "../components/ReturnIcon";
import { RecordingComponent } from "../components/RecordingComponent";
import { Player } from "../components/Player";
import { Recorder } from "../components/Recorder";
import { ButtonSiguienteTerminarEnviar } from "../components/ButtonSiguienteTerminarEnviar";
import { ButtonAtras } from "../components/ButtonAtras";
import { Question } from "../components/Question";

let mediaRecorder;
let config = { audio: true, video: true };
let recordingPositions = Object.keys(questions).map(() => false);
let urlsPositions = Object.keys(questions).map(() => null);
let stream;
const maxRecordingTime = 120;

export const VideosList = () => {
    const [recording, setRecording] = useState(recordingPositions);
    const [position, setPosition] = useState(null);
    const [blobs, setBlobs] = useState([]);
    const [urls, setUrls] = useState(urlsPositions);
    const [textBtnSiguiente, setTextBtnSiguiente] = useState("Enviar");
    const [recordingTime, setRecordingTime] = useState(0);
    const [videoLocalSrc, setVideoLocalSrc] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (recording[position]) {
            const playVideoFromCamera = async () => {
                stream = await navigator.mediaDevices.getUserMedia(config);

                setVideoLocalSrc(stream);

                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.start();

                //Si existe la url de la posicion x en el array de urls, eliminarlo
                urls[position] && null;

                mediaRecorder.addEventListener("dataavailable", (event) => {
                    setBlobs((prevUrls) => {
                        const newArray = [...prevUrls];
                        newArray[position] = event.data;
                        return newArray;
                    });
                });
            };

            playVideoFromCamera();
            return;
        }

        if (mediaRecorder) {
            mediaRecorder.stop();
            stream.getTracks().forEach((track) => track.stop());
        }
    }, [recording[position]]);

    useEffect(() => {
        if (videoRef.current && videoLocalSrc) {
            videoRef.current.srcObject = videoLocalSrc;
        }
    }, [videoLocalSrc]);

    useEffect(() => {
        setUrls((prevUrls) => {
            const newArray = [...prevUrls];
            if (blobs[position]) {
                newArray[position] = URL.createObjectURL(blobs[position]);
            }
            return newArray;
        });
    }, [blobs[position]]);

    const _handleRecordingPaused = (index) => {
        setRecording((prevRecording) => {
            const newArray = [...prevRecording];
            newArray[index] = !newArray[index];
            return newArray;
        });

        setPosition(index);
    };

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

    const _handleListVideos = () => {
        setPosition(null);
    };

    const _handleFilterEmptys = () => {
        const indexSave = urls.reduce((minIndex, url, index) => {
            if (url === null && (minIndex === null || index < minIndex)) {
                return index;
            } else {
                return minIndex;
            }
        }, null);

        if (indexSave !== null) {
            setPosition(indexSave);
        }

        if (textBtnSiguiente === "Terminar") {
            setPosition(null);
        }

        if (textBtnSiguiente === "Enviar") {
            toast("Tu videocuestionario fue enviado con exito");
        }
    };

    useEffect(() => {
        if (urls.every((url) => url !== null)) {
            setTextBtnSiguiente("Terminar");

            //Si todos los campos de urls están llenos y Position es Null (Mostrando lista)
            if (position === null) {
                setTextBtnSiguiente("Enviar");
            }
        }
    }, [urls]);

    useEffect(() => {
        if (position !== null) {
            setTextBtnSiguiente("Siguiente");
        } else {
            setTextBtnSiguiente("Enviar");
        }
    }, [position]);

    const _handleBack = () => {
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
                    </nav>
                ) : (
                    <></>
                )}

                <header>
                    <h1>VIDEOCUESTIONARIO</h1>
                </header>

                <main className="containerVideoList">
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
                                            _handleRecordingPaused={
                                                _handleRecordingPaused
                                            }
                                        />

                                        {recording[position] && (
                                            <RecordingComponent
                                                recordingTime={recordingTime}
                                                maxRecordingTime={
                                                    maxRecordingTime
                                                }
                                            />
                                        )}
                                    </div>

                                    {recording[index] && (
                                        <Player videoRef={videoRef} />
                                    )}
                                    <Recorder
                                        index={index}
                                        recording={recording}
                                        urls={urls}
                                        position={position}
                                    />

                                    <Question
                                        questions={questions}
                                        question={question}
                                    />
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
                        _handleFilterEmptys={_handleFilterEmptys}
                        textBtnSiguiente={textBtnSiguiente}
                        urls={urls}
                    />
                </div>
            </div>
        </>
    );
};
