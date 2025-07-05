/** @jsx h */
import { h } from "../../../jsx.ts";
import { Component } from "../../../components/component.ts";
import { SlashMenuItem } from "./slash-menu-item.tsx";
import { SlashMenuExtensionEditorPlugin } from "../slash-menu-plugin.tsx";


interface SlashMenuProps {
    extensionPlugins: SlashMenuExtensionEditorPlugin[];
}

interface SlashMenuState {
    items: SlashMenuItemData[];
}

export interface SlashMenuItemData {
    label: string;
    onSelect: (baseContent: string) => void;
}

export class SlashMenu extends Component<SlashMenuProps, SlashMenuState> {

    constructor() {
        super();

        this.state = {
            items: [
                {
                    label: "H1",
                    onSelect: (baseContent: string) => {
                        this.insert("<h1>H1</h1>");
                    }
                },
                {
                    label: "Paragraph",
                    onSelect: (baseContent: string) => {
                        this.insert("<p>P</p>");
                    }
                }
            ]
        };
    }

    override onMount(): void {
        const newItems = [...this.state.items];

        for (const plugin of this.props.extensionPlugins) {
            newItems.push({
                label: plugin.label,
                onSelect: (baseContent: string) => plugin.onSelect(baseContent)
            });
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
                            onSelect={() => item.onSelect("")}
                        />
                    </li>
                ))}
            </ul>
        );
    }
}
