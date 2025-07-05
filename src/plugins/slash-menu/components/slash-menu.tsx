/** @jsx h */
import { Fragment, h } from "../../../jsx.ts";
import { Component } from "../../../components/component.ts";
import { SlashMenuItem } from "./slash-menu-item.tsx";
import { SlashMenuExtensionEditorPlugin } from "../slash-menu-plugin.tsx";


interface SlashMenuProps {
    extensionPlugins: SlashMenuExtensionEditorPlugin[];
}

interface SlashMenuState {
    items: SlashMenuItemData[];
    showSlashMenu: boolean;
}

export interface SlashMenuItemData {
    label: string;
    onSelect: () => void;
}

export class SlashMenu extends Component<SlashMenuProps, SlashMenuState> {

    constructor() {
        super();

        this.state = {
            items: [
                {
                    label: "H1",
                    onSelect: () => {
                        this.insert("<h1>H1</h1>");
                    }
                },
                {
                    label: "Paragraph",
                    onSelect: () => {
                        this.insert("<p>P</p>");
                    }
                }
            ],
            showSlashMenu: false
        };
    }

    override onMount(): void {
        const newItems = [...this.state.items];

        for (const plugin of this.props.extensionPlugins) {
            newItems.push({
                label: plugin.label,
                onSelect: () => plugin.onSelect()
            });
        }

        this.setState({ items: newItems });

        this.on(document, "keydown", this.handleKey as EventListener);
    }

    private readonly handleKey = (e: KeyboardEvent) => {
        if (e.key === "/" && !this.state.showSlashMenu) {
            this.setState({ showSlashMenu: true });
        }

        if (e.key === "Escape" && this.state.showSlashMenu) {
            this.setState({ showSlashMenu: false });
        }
    };

    insert(content: string) {
        const contentNode = document.getElementById("content")!;
        contentNode.insertAdjacentHTML("beforeend", content);
    }

    render() {
        return (
            <Fragment>
                {this.state.showSlashMenu &&
                    <ul part="menu" class="slash-menu">
                        {this.state.items.map((item) => (
                            <li part="item">
                                <SlashMenuItem
                                    label={item.label}
                                    onSelect={() => item.onSelect()}
                                />
                            </li>
                        ))}
                    </ul>}
            </Fragment>
        );
    }
}
