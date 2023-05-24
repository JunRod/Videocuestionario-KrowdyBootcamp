export const ButtonSiguienteTerminarEnviar = ({
    recording,
    position,
    _handleFilterEmptys,
    textBtnSiguiente,
    urls,
}) => {
    return (
        <button
            className={`${recording[position] ? " disabled" : ""}`}
            onClick={!recording[position] ? _handleFilterEmptys : undefined}
            disabled={urls.some(
                (url) => url === null && textBtnSiguiente === "Enviar"
            )}
        >
            {textBtnSiguiente}
        </button>
    );
};
