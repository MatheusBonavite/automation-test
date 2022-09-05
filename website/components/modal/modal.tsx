import { FunctionComponent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalStyle } from "./modal.style";

type ModalProps = {
    anchor?: string;
    open?: string;
    openStateHandler: (setState: string) => void;
};

const Modal: FunctionComponent<ModalProps> = ({
    anchor = "react-portal",
    open = "",
    openStateHandler,
}) => {
    const [componentMounted, setMount] = useState(false);

    useEffect(() => {
        if (typeof document != "undefined") setMount(true);
    }, []);

    useEffect(() => {
        const body = document.querySelector("body");
        if (body) body.style.overflow = open ? "hidden" : "auto";
        return () => {
            if (body) body.style.overflow = "auto";
        };
    }, [open]);

    if (componentMounted && open) {
        return ReactDOM.createPortal(
            <ModalStyle onClick={() => openStateHandler("")}>
                <div
                    style={{
                        width: "50%",
                        height: "20%",
                        borderRadius: "1em",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <div style={{ color: "var(--error-color)" }}>{open}</div>
                </div>
            </ModalStyle>,
            document?.getElementById(anchor) as Element
        );
    }

    return null;
};

export { Modal };
