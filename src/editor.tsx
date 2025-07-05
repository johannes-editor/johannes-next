/** @jsx h */
import { Fragment, h } from "./jsx.ts";
import { setLocale, t } from "./i18n/index.ts";
import { appendPlugins } from "./plugins/plugin-manager.ts"

/**
* Initializes the text editor.
* 
* @param root The root HTML element where the editor will be mounted.
*/
export async function initEditor(root: HTMLElement) {
    // Set the language for the interface, defaulting to English if not specified.
    const lang = root.getAttribute("lang") || "en";
    await setLocale(lang);

    /** Load the basic editor layout */
    root.replaceChildren(
        <Fragment>
            <div id="content" contenteditable="true">
                <h1 data-placeholder={t("untitled")}></h1>
                <p data-placeholder={t("startTyping")}></p>
            </div>
        </Fragment>
    );

    /** Append plugins to the editor */
    appendPlugins(root);
}