/** @jsx h */
import { h } from '../../../jsx.ts';
import { Component } from '../../../components/component.ts';

export interface CalloutProps {
    content: string;
}

export class Callout extends Component<CalloutProps> {
    render() {
        return <div class="callout">{this.props.content}</div>;
    }
}