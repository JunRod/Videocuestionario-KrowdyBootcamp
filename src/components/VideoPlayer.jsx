import { useEffect, useRef } from "react";

export const VideoPlayer = ({index, recording, urls, position, stop}) => {

    const refVideoPlayer = useRef()

    //No reproducir en cuando vallamos a la vista lista
    useEffect(() => {
        if(!position === null) return
        refVideoPlayer.current.autoplay = false
    }, [position])

    return (
        <video
            ref={refVideoPlayer}
            key={position}
            className={recording[index] ? "none" : ""}
            src={urls[index]}
            controls={urls[index] ? true : false}
            autoPlay={(recording[index] || stop) ? false : position !== null ? true : false}
        />
    );
};
