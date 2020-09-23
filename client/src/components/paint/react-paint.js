import React from "react";

import MenuBar from "./menu-bar.js";
import Content from "./content.js";
import ColorPanel from "./color-panel.js";

import pencil from "./pencil.svg";
import line from "./line.svg";
import brush from "./brush.svg";
import fill from "./fill.svg";
import rectangle from "./rectangle.svg";
import text from "./text.svg";
import circle from "./circle.svg";
import erase from "./erase.svg";
import picker from "./picker.svg";

import "../styles/reactpaint.css"

const defaultColor = "black";
const defaultTool = "Pencil";


const toolbarItems = [
  { name: "Pencil", text: "pencil" },
  { name: "Line", text: "line" },
  { name: "Brush", text: "brush" },
  { name: "Fill", text: "fill" },
  { name: "Text", text: "text" },
  { name: "Rectangle", text: "rectangle" },
  { name: "Circle", text: "circle" },
  { name: "Erase", text: "erase" },
  { name: "Picker", text: "picker" }
];

export default class ReactPaint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: defaultColor,
      selectedItem: defaultTool,
      toolbarItems: toolbarItems
    };
    this.changeColor = this.changeColor.bind(this);
    this.changeTool = this.changeTool.bind(this);
  }

  changeColor(event) {
    this.setState({ color: event.target.style.backgroundColor });
  }

  changeTool(event, tool) {
    this.setState({ selectedItem: tool });
  }

  render() {
    return (
      <div>
        <Content
          items={this.state.toolbarItems}
          activeItem={this.state.selectedItem}
          handleClick={this.changeTool}
          color={this.state.color}
        />
        <ColorPanel
          selectedColor={this.state.color}
          handleClick={this.changeColor}
        />
      </div>
    );
  }
}
