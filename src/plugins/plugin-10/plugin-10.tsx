/** @jsx h */
import { h } from "../../jsx.ts";
import { Plugin } from "../plugin.ts";
import { Button10 } from "./button-10.tsx";

export class Plugin10 extends Plugin {

    override setup(root: HTMLElement): void {
        
        root.appendChild(
            <Button10 />
        );
    }
}