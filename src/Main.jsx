import "./App.css";
import { Component } from "react";
import Toolbar from "./toolbar";
import Canvas from "./canvas";
import React from "react";
import { Stack } from "@mui/system";
import { Box, styled } from "@mui/material";

const Container = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    // height: "80vh",
    width: "55vw",
    justifyContent: "space-between",
    textAlign: "flex-start",
    alignItems: "flex-start",

    gap: "20px",
    // padding: "30px"
}));

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: "",
            defaultBboxs: [],
            stageRef: null,
            manualBbox: [],
        };
    }
    toolCallback = (childData) => {
        //console.log(childData);
        this.setState(childData);
    };
    render() {
        return (
            <Container>
                <Box padding="30px">
                    <Canvas
                        toolCallback={this.toolCallback}
                        imageURL={this.state.imageURL}
                        defaultBboxs={this.state.defaultBboxs}
                        manualBbox={this.state.manualBbox}
                        width={window.innerWidth * 0.55 - 60}
                        height={window.innerHeight * 0.7}
                    ></Canvas>
                </Box>
                <Toolbar
                    toolCallback={this.toolCallback}
                    stageRef={this.state.stageRef}
                />
            </Container>
        );
    }
}

export default Main;
