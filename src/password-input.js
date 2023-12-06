import { renderTree, h } from "./jsx.js";
import htm from "./htm.module.js";

const html = htm.bind(h);

export class PasswordInput extends HTMLElement {

  template = html`<button class="input-button"><span class="input-button__text">show</span></button>`
  buttonElement = null;
  buttonText = null;
  input = null;

  static register() {
    customElements.define('password-input', PasswordInput);
  }

  constructor() {
    super();
  }

  get discrete() {
    return this.input && this.input.type === 'password';
  }

  connectedCallback() {
    this.style.display = 'inline-flex';
    this.input = this.querySelector('input');
    renderTree(this, this.template);
    
    this.buttonElement = this.querySelector('.input-button');
    this.buttonText = this.querySelector('.input-button__text');

    this.#setButtonText();
    this.buttonElement.addEventListener('click', this.onClickButton);
  }

  disconnectedCallback() {
    if (this.buttonElement) {
      this.removeEventListener('click', this.onClickButton);
      this.buttonElement.remove();
    }
  }

  onClickButton = () => {
    if (this.discrete) {
      this.#showPassword();
    } else {
      this.#hidePassword();
    }
  }

  #showPassword() {
    this.input?.setAttribute('type', 'text');
    this.#setButtonText();
  }

  #hidePassword() {
    this.input?.setAttribute('type', 'password');
    this.#setButtonText();
  }

  #setButtonText() {
    this.buttonText.textContent = this.discrete ? 'show' : 'hide';
  }
}