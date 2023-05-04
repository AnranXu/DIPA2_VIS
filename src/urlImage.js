import React, { Component } from 'react';
import { Image } from 'react-konva';
class URLImage extends React.Component { 
    constructor(props){
      super(props);
      this.state = {
        image: null,
        ratio: 1,
      };
    }
    componentDidMount() {
      this.loadImage();
    }
    componentDidUpdate(oldProps) {
      if (oldProps.src !== this.props.src) {
        this.loadImage();
      }
    }
    componentWillUnmount() {
      this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
      // save to "this" to remove "load" handler on unmount
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.ratio = Math.min(this.props.width / this.image.naturalWidth, this.props.height / this.image.naturalHeight);
      this.image.width = this.image.naturalWidth * this.ratio;
      this.image.height = this.image.naturalHeight * this.ratio;
      this.setState({
        image: this.image,
      });
      this.props.toolCallback({ ratio: this.ratio});
      // if you keep same image object during source updates
      // you will have to update layer manually:
      // this.imageNode.getLayer().batchDraw();
    };
    render() {
      return (
        <Image
          x={this.props.x}
          y={this.props.y}
          image={this.state.image}
          ref={this.props.setRef}
        />
      );
    }
  }

  export default URLImage;