export const ButtonSiguienteTerminarEnviar = ({
    recording,
    position,
    _handleButtonFunctions,
    textBtnNext,
    urls,
}) => {
    return (
        <button
            className={`${recording[position] ? " disabled" : ""}`}
            onClick={!recording[position] ? _handleButtonFunctions : undefined}
            disabled={urls.some(
                (url) => url === null && textBtnNext === "Enviar"
            )}
        >
            {textBtnNext}
        </button>
    );
};
