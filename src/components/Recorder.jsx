export const Recorder = ({index, recording, urls, position }) => {
    return (
        <video
            key={index}
            className={recording[index] ? "none" : ""}
            src={urls[index]}
            controls={urls[index] ? true : false}
            autoPlay={position !== null ? true : false}
        />
    );
};
