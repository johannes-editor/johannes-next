/** @jsx h */
import { Fragment, h } from "../../../jsx.ts";
import { SlashMenuItem } from "./slash-menu-item.tsx";
import { SlashMenuPluginExtension } from "../slash-menu-plugin.tsx";
import { OverlayComponent } from "../../../components/overlay-component.ts";
import { DomUtils } from "../../../utils/dom-utils.ts";
import { SelectionUtils } from "../../../utils/selection-utils.ts";
import { KeyboardKeys } from "../../../utils/keyboard-keys.ts";
import { EventTypes } from "../../../utils/event-types.ts";


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

export class SlashMenuOverlay extends OverlayComponent<SlashMenuProps, SlashMenuState> {

    contentElement: HTMLElement;
    block: HTMLElement | null;
    range: Range | null;

    static override get tagName() {
        return "slash-menu";
    }

    constructor() {
        super();

        this.state = {
            items: [
                {
                    label: "H1",
                    onSelect: () => {
                        DomUtils.insertBlockAfter(this.block, "<h1>H1</h1>");
                    }
                },
                {
                    label: "Paragraph",
                    onSelect: () => {
                        DomUtils.insertBlockAfter(this.block, "<p>P</p>");
                    }
                }
            ],
            selectedIndex: 0
        };

        this.contentElement = document.getElementById("content")!;
        this.block = DomUtils.findClosestAncestorOfSelectionByClass("block");
        this.range = SelectionUtils.getCurrentSelectionRange();
    }

    override onMount(): void {
        const newItems = [...this.state.items];

        for (const plugin of this.props.extensionPlugins) {
            newItems.push({
                label: plugin.label,
                onSelect: () => plugin.onSelect()
            });

            plugin.onMounted();
        }

        this.on(document, EventTypes.KeyDown, this.handleKey as EventListener);

        this.setState({ items: newItems });
    }

    private readonly handleKey = (event: KeyboardEvent) => {

        switch (event.key) {

            case KeyboardKeys.ArrowDown:
                event.preventDefault();
                this.setState({
                    selectedIndex: (this.state.selectedIndex + 1) % this.state.items.length,
                });
                break;

            case KeyboardKeys.ArrowUp:
                event.preventDefault();
                this.setState({
                    selectedIndex: (this.state.selectedIndex - 1 + this.state.items.length) % this.state.items.length,
                });
                break;

            case KeyboardKeys.Enter:
                event.preventDefault();
                {
                    const item = this.state.items[this.state.selectedIndex];
                    if (item) {
                        this.handleOnSelect(item);
                    }
                }
                break;

            case KeyboardKeys.Escape:
            // No need to handle the Escape key here.
            // All elements inheriting from Overlay already handle Escape key presses.
            // The OverlayManager takes care of stacked overlays: pressing Escape will always close the topmost overlay first (LIFO order).
        }
    };

    handleOnSelect(item: SlashMenuItemData) {
        item.onSelect();
        this.remove(); // By default, remove the SlashMenu after executing onSelect
    }

    insert(content: string) {
        const contentNode = document.getElementById("content")!;
        contentNode.insertAdjacentHTML("beforeend", content);
    }

    render() {
        return (
            <Fragment>
                <ul role="menu" part="menu" class="slash-menu">
                    {this.state.items.map((item, index) => (
                        <li role="menuitem" part="item">
                            <SlashMenuItem
                                label={item.label}
                                onSelect={() => this.handleOnSelect(item)}
                                selected={index === this.state.selectedIndex}
                            />
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}

