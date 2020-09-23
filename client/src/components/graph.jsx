import React from 'react';
import { SketchField, Tools } from "react-sketch";
 
export default class SketchFieldDemo extends React.Component {
        render() {
                return (
                    <div>
                        <SketchField
                        />
                        <Tools />
                    </div>
                );
        }
}
