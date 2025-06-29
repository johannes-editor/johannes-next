export abstract class EditorPlugin {

    name: string;
    author: string;
    active: boolean;

    constructor(name: string, author: string, active: boolean) {
        this.name = name;
        this.author = author;
        this.active = active;
    }
}