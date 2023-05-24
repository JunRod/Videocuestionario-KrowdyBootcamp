import {Toaster} from "sonner"

export const ToasterComponent = () => {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: "rgba(254, 117, 66, 1)",
                    fontSize: "20px",
                    letterSpacing: "normal",
                    color: "white",
                    textAlign: "center",
                },
            }}
        />
    );
};
