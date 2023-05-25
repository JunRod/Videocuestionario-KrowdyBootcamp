
export const VideoPlayer = ({index, recording, urls, position, stop }) => {

    return (
        <video
            key={index}
            className={recording[index] ? "none" : ""}
            src={urls[index]}
            controls={urls[index] ? true : false}
            autoPlay={(recording[index] || stop) ? false : position !== null ? true : false}
        />
    );
};
