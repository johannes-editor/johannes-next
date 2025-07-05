interface ImportMeta {
  glob: (path: string, options?: { eager?: boolean }) => Record<string, () => Promise<unknown>>;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}