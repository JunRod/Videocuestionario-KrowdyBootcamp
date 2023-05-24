export const ListaVideosComponent = ({recording, position, _handleListVideos}) => {
    return (
        <i
            className={`containerButtons${recording[position] ? " disabled" : ""}`}
            onClick={!recording[position] ? _handleListVideos : undefined}
        >
            Lista de videos
        </i>
    );
};
