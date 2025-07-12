export class DomUtils {

    static findClosestAncestorOfSelectionByClass(className: string): HTMLElement | null {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            return null;
        }

        let currentElement: Node | null = selection.getRangeAt(0).commonAncestorContainer;

        if (currentElement && currentElement.nodeType === Node.TEXT_NODE) {
            currentElement = currentElement.parentNode;
        }

        while (currentElement) {
            if (currentElement.nodeType === Node.ELEMENT_NODE && (currentElement as HTMLElement).classList.contains(className)) {
                return currentElement as HTMLElement;
            }
            currentElement = currentElement.parentNode;
        }

        return null;
    }

    static insertBlockAfter(block: HTMLElement | null, newHTML: string) {
        const contentNode = document.getElementById("content")!;

        if (block) {

            block.insertAdjacentHTML("afterend", newHTML);
        } else {
            contentNode.insertAdjacentHTML("beforeend", newHTML);
        }
    }

}