export const ButtonAtras = ({position, recording, _handleBack}) => {

    const logicClass = () => {
        return position === null
        ? "transparent"
        : recording[position]
        ? " disabled"
        : ""
    }

    const _handleButton = () => {
        return !recording[position] ? _handleBack : undefined
    }


    return (
        <button
            className={logicClass()}
            onClick={_handleButton()}
        >
            Atrás
        </button>
    );
};
