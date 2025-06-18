export function initEditor(root: HTMLElement) {
  root.innerHTML = '';

  const title = document.createElement('h1');
  title.dataset.placeholder = 'Untitled';

  const paragraph = document.createElement('p');
  paragraph.dataset.placeholder = 'Start typing...';

  root.appendChild(title);
  root.appendChild(paragraph);
}