/** @jsx h */
import { Fragment, h } from "./jsx.ts";
import { setLocale, t } from "./i18n/index.ts";
import { CounterToggle } from "./components/samples/nested-component/counter-toggle.tsx";
import { SlashMenu } from "./components/samples/slash-menu/slash-menu.tsx";
import { loadActivePlugins } from "./plugins/loader.ts";
import { SimpleButton } from "./components/samples/simple-button/simple-button.tsx";
import { FetchButton } from "./components/samples/fetch-component/fetch-component.tsx";

export { setLocale };

export async function initEditor(root: HTMLElement) {
    const lang = root.getAttribute("lang") || "en";
    await setLocale(lang);

    const plugins = await loadActivePlugins();

    root.replaceChildren(
        <Fragment>
            <div id="content" contenteditable="true">
                <h1 data-placeholder={t("untitled")}></h1>
                <p data-placeholder={t("startTyping")}></p>
            </div>
            <SimpleButton />
            <CounterToggle />
            <SlashMenu plugins={plugins} />
            <FetchButton />
        </Fragment>
    );
}