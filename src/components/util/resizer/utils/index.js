const TOP_RESIZER_PROPERTIES = {
    anchorSide: "top",
    axis: "y",
    dimension: "height",
    orientation: -1,
};

const RIGHT_RESIZER_PROPERTIES = {
    anchorSide: "right",
    axis: "x",
    dimension: "width",
    orientation: 1,
};

const BOTTOM_RESIZER_PROPERTIES = {
    anchorSide: "bottom",
    axis: "y",
    dimension: "height",
    orientation: 1,
};

const LEFT_RESIZER_PROPERTIES = {
    anchorSide: "left",
    axis: "x",
    dimension: "width",
    orientation: -1,
};

export const OPPOSITE_SIDE = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
};

export const RESIZER_PROPERTIES = {
    top: [BOTTOM_RESIZER_PROPERTIES],
    "top-right": [BOTTOM_RESIZER_PROPERTIES, LEFT_RESIZER_PROPERTIES],
    right: [LEFT_RESIZER_PROPERTIES],
    "bottom-right": [TOP_RESIZER_PROPERTIES, LEFT_RESIZER_PROPERTIES],
    bottom: [TOP_RESIZER_PROPERTIES],
    "bottom-left": [TOP_RESIZER_PROPERTIES, RIGHT_RESIZER_PROPERTIES],
    left: [RIGHT_RESIZER_PROPERTIES],
    "top-left": [BOTTOM_RESIZER_PROPERTIES, RIGHT_RESIZER_PROPERTIES],
};
