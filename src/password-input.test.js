import { describe, it, afterEach, before } from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

describe('password-input component', ()=> {
  let window, document, customElements, HTMLElement, DocumentFragment, PasswordInput;

  before(async () => {
    window = global.window = parseHTML(`<!DOCTYPE html><html><head></head><body></body></html>`);
    DocumentFragment = global.DocumentFragment = window.DocumentFragment;
    document = global.document = window.document;
    customElements = global.customElements = window.customElements;
    HTMLElement = global.HTMLElement = window.HTMLElement;

    const module = await import('./password-input.js');
    
    PasswordInput = module.PasswordInput;
    PasswordInput.register();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should be defined in the custonElements registry', () => {
    assert.equal(!!customElements.get('password-input'), true);    
  });

  it('should create a button', () => {
    document.body.innerHTML = `
      <password-input>
        <input id="pw" type="text">
      </password-input>
    `;
    const instance = document.querySelector('password-input');
    const button = instance.querySelector('button');

    assert.equal(!!button, true);
  });

});