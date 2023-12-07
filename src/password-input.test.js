import { describe, it, afterEach, before } from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

describe('password-input component', ()=> {
  let window, document, customElements, HTMLElement, DocumentFragment, PasswordInput, Event;

  before(async () => {
    window = global.window = parseHTML(`<!DOCTYPE html><html><head></head><body></body></html>`);
    DocumentFragment = global.DocumentFragment = window.DocumentFragment;
    document = global.document = window.document;
    customElements = global.customElements = window.customElements;
    Event = global.Event = window.Event;
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

  it('should set the discrete property to false when the input type is text', () => {
    document.body.innerHTML = `
      <password-input>
        <input id="pw" type="text">
      </password-input>
    `;
    const instance = document.querySelector('password-input');
    const buttonText = instance.querySelector('.input-button__text');
    
    assert.equal(buttonText.textContent, 'hide');
    assert.equal(instance.discrete, false);
  });

  it('should set the discrete property to true when the input type is password', () => {
    document.body.innerHTML = `
      <password-input>
        <input id="pw" type="password">
      </password-input>
    `;
    const instance = document.querySelector('password-input');
    const buttonText = instance.querySelector('.input-button__text');
    
    assert.equal(buttonText.textContent, 'show');
    assert.equal(instance.discrete, true);
  });

  it('should be possible to reveal the password by clicking the button', () => {
    document.body.innerHTML = `
      <password-input>
        <input id="pw" type="password">
      </password-input>
    `;
    const instance = document.querySelector('password-input');
    const input = instance.querySelector('input')
    const button = instance.querySelector('button');
    
    button.dispatchEvent(new Event('click'));
    
    assert.equal(input.getAttribute('type'), 'text');
    assert.equal(instance.discrete, false);
  });

  it('should be possible to hide the password by clicking the button', () => {
    document.body.innerHTML = `
      <password-input>
        <input id="pw" type="text">
      </password-input>
    `;
    const instance = document.querySelector('password-input');
    const input = instance.querySelector('input')
    const button = instance.querySelector('button');
    
    button.dispatchEvent(new Event('click'));
    
    assert.equal(input.getAttribute('type'), 'password');
    assert.equal(instance.discrete, true);
  });

});