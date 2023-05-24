import { formatedTime } from "../helpers/formatSeconds";
import record from "./../images/record.svg";

export const RecordingComponent = ({recordingTime, maxRecordingTime}) => {
    return (
        <div className="containerRecording">
            <div className="recordingTime">
                {formatedTime(recordingTime)}/{formatedTime(maxRecordingTime)}
            </div>
            <img src={record} />
        </div>
    );
};
