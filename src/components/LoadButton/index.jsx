import { Box, styled, Typography } from "@mui/material";
import React from "react";

// props
// onClick: VoidFunc

const Container = styled(Box)({
    border: "2px solid",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 40px",
});

const LoadButton = (props) => {
    return (
        <Container>
            <Typography variant="h6">
                {" "}
                {props.annotator === -1
                    ? "No Annotator Selected"
                    : "Annotator " + props.annotator + " Selected"}
            </Typography>
        </Container>
    );
};

export default LoadButton;
