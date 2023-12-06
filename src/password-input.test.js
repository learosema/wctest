const { describe, it, beforeEach } = require('node:test');
const { parseHTML } = require('linkedom');

describe('password-input component', ()=> {
  let window;

  beforeEach(() => {
    window = parseHTML(`<!DOCTYPE html><html><head></head><body>
    
    </body></html>`);
  });

});