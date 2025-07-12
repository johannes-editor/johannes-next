/** @jsx h */
import { h } from "../../../jsx.ts";
import { Component } from "../../component.ts";

export class SimpleButton extends Component {

    // static styles = /*css*/ `
    //     button {
    //         background-color: yellow;
    //     }
    // `;

    text: string = "Just a button";

    render() {
        return <button type="button">{this.text}</button>;
    }
}
