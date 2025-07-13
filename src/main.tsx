/** @jsx h */
import { Fragment, h } from "./jsx.ts";
import { setLocale, t } from "./core/i18n/index.ts";
import { setRoot } from "./core/editor-engine/index.ts";
import { init } from "./core/plugin-engine/index.ts";

/**
* Initializes the text editor.
* 
* @param root The root HTML element where the editor will be mounted.
*/
export async function initEditor(root: HTMLElement) {
    setRoot(root);
    // Set the language for the interface, defaulting to English if not specified.
    const lang = root.getAttribute("lang") || "en";
    await setLocale(lang);

    /** Load the basic editor layout */
    root.replaceChildren(
        <Fragment>
            <div id="content" contenteditable="true">
                <h1 class="block" data-placeholder={t("untitled")}></h1>
                <p class="block" data-placeholder={t("startTyping")}></p>
            </div>
        </Fragment>
    );

    /** Append plugins to the editor */
    await init(root);
}