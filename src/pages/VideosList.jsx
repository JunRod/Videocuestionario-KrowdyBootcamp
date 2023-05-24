import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import questions from "./questions.json";
import play from "./../images/play.svg";
import repeat from "./../images/repeat.svg";
import stop from "./../images/stop.svg";
import record from "./../images/record.svg";

let mediaRecorder;
let config = { audio: true, video: true };
let recordingPositions = Object.keys(questions).map(() => false);
let urlsPositions = Object.keys(questions).map(() => null);
const maxRecordingTime = 120;
let stream

export const VideosList = () => {
    const [recording, setRecording] = useState(recordingPositions);
    const [position, setPosition] = useState(null);
    const [blobs, setBlobs] = useState([]);
    const [urls, setUrls] = useState(urlsPositions);
    const [textBtnSiguiente, setTextBtnSiguiente] = useState("Enviar");
    const [recordingTime, setRecordingTime] = useState(0);
    const [videoLocalSrc, setVideoLocalSrc] = useState(null)
    const videoRef = useRef(null)

    useEffect(() => {

        if (recording[position]) {
            const playVideoFromCamera = async () => {
                stream = await navigator.mediaDevices.getUserMedia(
                    config
                );
                
                setVideoLocalSrc(stream)

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
    }, [videoLocalSrc])
    

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

    const formatedTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes);
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedMinutes}:${formattedSeconds}`;
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
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: "rgba(254, 117, 66, 1)",
                        fontSize: "20px",
                        letterSpacing: "normal",
                        color: "white",
                        textAlign: "center",
                    },
                }}
            />

            <div className="container">
                {position !== null ? (
                    <nav
                        className={`flexButton${
                            recording[position] ? " disabled" : ""
                        }`}
                        onClick={!recording[position] && _handleListVideos}
                    >
                        <p>Lista de videos</p>
                    </nav>
                ) : (
                    <></>
                )}

                <header>
                    <h1>VIDEOCUESTIONARIO</h1>
                </header>
                <main className="container_containerVideo">
                    {Object.keys(questions)
                        .filter((question, index) => {
                            if (position !== null) {
                                return position === index && question;
                            }
                            //Devolver todos las questions si position es null
                            return question;
                        })
                        .map((question) => {
                            const index = Number(question);

                            return (
                                <div className="containerVideo">
                                    <div className="recordingContainer">
                                        <img
                                            src={
                                                urls[index] && recording[index]
                                                    ? stop
                                                    : urls[index]
                                                    ? repeat
                                                    : recording[index]
                                                    ? stop
                                                    : play
                                            }
                                            className="containerVideo_play"
                                            onClick={() =>
                                                _handleRecordingPaused(index)
                                            }
                                        />

                                        {/* Recording Time Component*/}
                                        {recording[position] && (
                                            <div className="containerRecording">
                                                <div className="recordingTime">
                                                    {formatedTime(
                                                        recordingTime
                                                    )}
                                                    /
                                                    {formatedTime(
                                                        maxRecordingTime
                                                    )}
                                                </div>
                                                <img src={record} />
                                            </div>
                                        )}
                                    </div>

                                    {recording[index] && (
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            muted
                                        ></video>
                                    )}
                                    <video
                                        key={index}
                                        className={recording[index] && "none"}
                                        src={urls[index]}
                                        controls={urls[index] ? true : false}
                                        autoPlay={
                                            urls[index] && position
                                                ? true
                                                : false
                                        }
                                    ></video>
                                    <div className="containerVideo_questions">
                                        {questions[question]}
                                    </div>
                                </div>
                            );
                        })}
                </main>
                <div className="flexButton">
                    {
                        <button
                            className={
                                position === null
                                    ? "transparent"
                                    : recording[position]
                                    ? " disabled"
                                    : ""
                            }
                            onClick={!recording[position] && _handleBack}
                        >
                            Atrás
                        </button>
                    }

                    <button
                        className={`${recording[position] ? " disabled" : ""}`}
                        onClick={!recording[position] && _handleFilterEmptys}
                        disabled={urls.some(
                            (url) =>
                                url === null && textBtnSiguiente === "Enviar"
                        )}
                    >
                        {textBtnSiguiente}
                    </button>
                </div>
            </div>
        </>
    );
};
