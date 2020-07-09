import { keywords } from "../src/classes/keyWords";
const txt = 'match all letters have th or an before';

const keyworksIndices = {};
for (let index = 0; index < keywords.length; index++) {
    const keyword = keywords[index];
    const reg = RegExp(keyword, 'g');
    const res = reg.exec(txt);
    if (res && res.index > -1) {
        keyworksIndices[keyword] = res.index;
    }

}
function compare(keyIndex1, keyIndex2) {
    let compare = 0;
    if (keyIndex1[1] < keyIndex2[1]){
        compare  = -1;
    } else {
        if(keyIndex1[1] > keyIndex2[1]){
            compare = 1;
        }
    }
    return compare;
}
const keyArray = Object.keys(keyworksIndices).map(value=>[value,keyworksIndices[value]]);
keyArray.sort(compare);
console.log('keyArray', keyArray)