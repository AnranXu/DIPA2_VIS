import { Box } from "@mui/material";
import React from "react";

// props
// selected: boolean
// value: number (-3 <= n <=3)

const getColor = (value) => {
    if (value < 0) {
        return "#7D2F8E";
    } else if (value === 0) {
        return "#D6CFD8";
    } else {
        return "#EDB120";
    }
};

const getCircleSize = (value) => {
    const abs = Math.abs(value);
    if (abs === 3) {
        return "70px";
    } else if (abs === 2) {
        return "50px";
    } else if (abs === 1) {
        return "35px";
    } else {
        return "30px";
    }
};

const InformativenessCircle = (props) => {
    const color = getColor(props.value);
    const size = getCircleSize(props.value);
    const selected = props.selected;

    return (
        <Box
            width={size}
            height={size}
            border={`3px solid ${color}`}
            borderRadius="50%"
            backgroundColor={selected ? color : "none"}
        ></Box>
    );
};

export default InformativenessCircle;
