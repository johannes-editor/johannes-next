/** @jsx h */
import { Fragment, h } from "../../../jsx.ts";
import { SlashMenuItem } from "./slash-menu-item.tsx";
import { SlashMenuPluginExtension } from "../slash-menu-plugin.tsx";
import { Overlay } from "../../../components/base/overlay.ts";


interface SlashMenuProps {
    extensionPlugins: SlashMenuPluginExtension[];
}

interface SlashMenuState {
    items: SlashMenuItemData[];
    selectedIndex: number;
}

export interface SlashMenuItemData {
    label: string;
    onSelect: () => void;
}

export class SlashMenu extends Overlay<SlashMenuProps, SlashMenuState> {

    contentElement: HTMLElement;


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
            selectedIndex: 0
        };

        this.contentElement = document.getElementById("content")!;
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

        this.on(this.contentElement, "keydown", this.handleKey as EventListener);
    }

    private readonly handleKey = (e: KeyboardEvent) => {


        // if (!this.state.showSlashMenu) {
        //     return;
        // }

        // switch (e.key) {
        //     // case "Escape":
        //     //     this.setState({ showSlashMenu: false });
        //     //     break;
        //     case "ArrowDown":
        //         e.preventDefault();
        //         this.setState({
        //             selectedIndex: (this.state.selectedIndex + 1) % this.state.items.length,
        //         });
        //         break;
        //     case "ArrowUp":
        //         e.preventDefault();
        //         this.setState({
        //             selectedIndex: (this.state.selectedIndex - 1 + this.state.items.length) % this.state.items.length,
        //         });
        //         break;
        //     case "Enter":
        //         e.preventDefault();
        //         const item = this.state.items[this.state.selectedIndex];
        //         if (item) {
        //             item.onSelect();
        //             this.setState({ showSlashMenu: false });
        //         }
        //         break;
        // }
    };

    insert(content: string) {
        const contentNode = document.getElementById("content")!;
        contentNode.insertAdjacentHTML("beforeend", content);
    }

    render() {
        return (
            <Fragment>
                <ul part="menu" class="slash-menu">
                    {this.state.items.map((item, index) => (
                        <li part="item">
                            <SlashMenuItem
                                label={item.label}
                                onSelect={() => item.onSelect()}
                                selected={index === this.state.selectedIndex}
                            />
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}
