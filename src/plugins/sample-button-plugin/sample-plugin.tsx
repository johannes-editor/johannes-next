import { Plugin } from "../plugin.ts";

export class SampleButtonPlugin extends Plugin {
  override setup(root: HTMLElement, plugins: Plugin[]): void {
    throw new Error("Method not implemented.");
  }
}