import { Ras } from "./classes/ras.class";

const txt = 'help i need somebody help not just anybody';
const ras = new Ras();

// match simple expression, returns the matched expression from within the tex

// const res = ras.match(txt, 'help', {returnText: true, highlight:true})
// console.log(`res: `, res);

// match all letters

// const res = ras.matchAll(txt, 'letters', {numOfMatches: true});
// const res = ras.matchAll(txt, 'letters');
// console.log('res', res)

// match all intigers
const res = ras.matchAll(txt,'intigers')
console.log('res', res)


// TO DO:
// 1. return text with * before an after each match, since just returning the match is not helpful
// 2. return included sentence, paragraph
