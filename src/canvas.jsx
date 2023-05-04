import { Component } from "react";
import { Stage, Layer, Rect } from "react-konva";
import URLImage from "./urlImage.js";
import React from "react";
import { Box, styled } from "@mui/material";

const Container = styled(Box)(() => ({
    left: "0px",
    // padding: "0 20px",
    backgroundColor: "rgba(100, 100, 100, 0.2)",
}));

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.stageRef = React.createRef();
        this.imageRef = React.createRef();
        this.bboxStrokeWidth = 5;
        this.state ={
            ratio: 1,
        };
    }
    componentDidMount() {
        this.sendStage();
    }
    toolCallback = (childData) =>{
        console.log(childData);
        this.setState(childData);
    }
    createDefaultBboxs = () => {
        //console.log(this.props.bboxs);
        return this.props.defaultBboxs.map((bbox, i) => (
            <Rect
                x={parseInt(bbox["bbox"][0]) * this.state.ratio}
                y={parseInt(bbox["bbox"][1]) * this.state.ratio}
                width={parseInt(bbox["bbox"][2]) * this.state.ratio}
                height={parseInt(bbox["bbox"][3]) * this.state.ratio}
                fill={"rgba(255,255,255,0)"}
                draggable={false}
                shadowBlur={0}
                stroke={"black"}
                strokeWidth={this.bboxStrokeWidth}
                id={"bbox" + String(i) + "-" + String(bbox["category"])}
                key={"bbox" + String(i) + "-" + String(bbox["category"])}
                name={"bbox"}
            />
        ));
    };
    image = (imageURL, imageRef) =>{
        return(
            <Stage 
                width={this.props.width} 
                height={this.props.height}
                ref={this.stageRef}>
                <Layer>
                <Rect 
                    width={this.props.width} 
                    height={this.props.height} 
                    fill={this.props.paddingColor}
                    />
                <URLImage 
                    src={imageURL} 
                    ref={imageRef}
                    width={this.props.width}
                    height={this.props.height}
                    toolCallback={this.toolCallback}
                    />
                {this.props.defaultBboxs.length ? (
                        this.createDefaultBboxs()
                    ) : (
                        <Rect />
                )}
                </Layer>
            </Stage>
        );
    };
    sendStage = () => {
        this.props.toolCallback({ stageRef: this.stageRef });
    };
    render() {
        return (
            <Container id="canvasContainer">
                {this.image(this.props.imageURL, this.imageRef)}
            </Container>
        );
    }
}
export default Canvas;
