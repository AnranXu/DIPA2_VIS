import { Stack, Typography } from "@mui/material";
import React from "react";

// props
// title: string
// text: string

const DetailSection = (props) => {
    return (
        <Stack>
            <Typography variant="h5" fontWeight="bold">
                {props.title}
            </Typography>
            <Typography variant="h6" fontWeight="normal">
                {props.text}
            </Typography>
        </Stack>
    );
};

export default DetailSection;
