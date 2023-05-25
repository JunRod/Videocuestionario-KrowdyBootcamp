export const ButtonSiguienteTerminarEnviar = ({
    recording,
    position,
    _handleButtonFunctions,
    textBtnSiguiente,
    urls,
}) => {
    return (
        <button
            className={`${recording[position] ? " disabled" : ""}`}
            onClick={!recording[position] ? _handleButtonFunctions : undefined}
            disabled={urls.some(
                (url) => url === null && textBtnSiguiente === "Enviar"
            )}
        >
            {textBtnSiguiente}
        </button>
    );
};
