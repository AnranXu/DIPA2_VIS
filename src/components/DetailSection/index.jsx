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
            {
                props.text.length > 0 ?
                props.text.map((item, index) => {
                    return (
                        <Typography variant="h6" fontWeight="normal" key={index}>
                            {item}
                        </Typography>
                    )
                }) : (
                    <div></div>
                )
            }
        </Stack>
    );
};

export default DetailSection;
