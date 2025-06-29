/** @jsx h */
import { h } from "../../../jsx.ts";
import { Component } from "../../../component.ts";

export interface SlashMenuItemProps {
    label: string;
    onSelect: () => void;
}

export class SlashMenuItem extends Component<SlashMenuItemProps> {
    render() {
        return <button parte="button" onClick={this.props.onSelect}>{this.props.label}</button>;
    }
}