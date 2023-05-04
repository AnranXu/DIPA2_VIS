import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// props
// onClick: VoidFunc
// transType: "prev" | next

const TransitionButton = (props) => {
    return props.transType === "prev" ? (
        <IconButton onClick={props.onClick}>
            <Stack justifyContent="center" alignItems="center" width="100px">
                <ArrowBackIosNewIcon />
                <Typography variant="h6">PREVIOUS</Typography>
            </Stack>
        </IconButton>
    ) : (
        <IconButton onClick={props.onClick}>
            <Stack justifyContent="center" alignItems="center" width="100px">
                <ArrowForwardIosIcon />
                <Typography variant="h6">NEXT</Typography>
            </Stack>
        </IconButton>
    );
};

export default TransitionButton;
