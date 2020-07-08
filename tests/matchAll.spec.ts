import Ras  from "../classes/ras.class";
const assert = require('assert')
const text = 'help, i need sombody. help, not just anybody';

describe('test match all ras commands', () => {
    it('match all letters', () => {
        const ras = new Ras();
        const lettersRes = ras.parse('match all letters', text)
        console.log('lettersRes', lettersRes)

    });
});