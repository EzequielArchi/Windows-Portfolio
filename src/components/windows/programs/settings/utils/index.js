import Color from "../color";
import Background from "../background";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

export const OPTIONS_TYPES =  {
    color: "color",
    background: "background",
}

export const CONFIGURATION_OPTIONS = {
    [OPTIONS_TYPES.color]: {
        component: Color,
        id: OPTIONS_TYPES.color,
        label: "Color",
        icon: faPalette,
    },
    [OPTIONS_TYPES.background]: {
        component: Background,
        id: OPTIONS_TYPES.background,
        label: "Background",
        icon: faImage,
    },
}

