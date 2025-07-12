/** @jsx h */
import { h } from "../../../jsx.ts";
import { Component } from "../../../components/component.ts";

export interface SlashMenuItemProps {
    label: string;
    onSelect: () => void;
    selected: boolean;
}

export class SlashMenuItem extends Component<SlashMenuItemProps> {
    render() {

        const className = this.props.selected ? "selected" : "";
        return <button type="button" part="button" class={className} onClick={this.props.onSelect}>{this.props.label}</button>;
    }
    
}