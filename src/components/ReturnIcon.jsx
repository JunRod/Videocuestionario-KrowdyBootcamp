import play from "./../images/play.svg";
import repeat from "./../images/repeat.svg";
import stop from "./../images/stop.svg";

export const ReturnIcon = ({urls, index, recording, _handleRecordingPaused}) => {
    return (
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
            onClick={() => _handleRecordingPaused(index)}
        />
    );
};
