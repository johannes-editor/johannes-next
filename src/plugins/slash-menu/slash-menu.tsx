/** @jsx h */
import { h } from "../../../jsx.ts";
import { Component } from "../../../component.ts";
import { SlashMenuItem } from "./slash-menu-item.tsx";
import { SlashMenuProps, SlashMenuState } from "./types.ts";

export class SlashMenu extends Component<SlashMenuProps, SlashMenuState> {

    constructor() {
        super();

        this.state = {
            items: [
                { label: "H1", content: "<h1>H1</h1>" },
                { label: "Paragraph", content: "<p>P</p>" },
            ],
        };
    }

    override onMount(): void {

        const newItems = [...this.state.items];

        for (const plugin of this.props.plugins) {
            if ("slashMenuItems" in plugin) {
                newItems.push(...plugin.slashMenuItems);
            }
        }

        this.setState({ items: newItems });
    }

    insert(content: string) {
        const contentNode = document.getElementById("content")!;
        contentNode.insertAdjacentHTML("beforeend", content);
    }

    render() {
        return (
            <ul part="menu" class="slash-menu">
                {this.state.items.map((item) => (
                    <li part="item">
                        <SlashMenuItem
                            label={item.label}
                            onSelect={() => this.insert(item.content)}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}
