/** @jsx h */
import { h } from "../../jsx.ts";
import { Button10 } from "./button-10.tsx";
import { Plugin } from "../../core/plugin-engine/plugin.ts";

export class Plugin10 extends Plugin {

    override setup(root: HTMLElement): void {
        
        root.appendChild(
            <Button10 />
        );
    }
}