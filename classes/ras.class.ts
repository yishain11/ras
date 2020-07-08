import { MatchOptions } from "./matchOptions.interface";
export class Ras {

    constructor() { }

    createRegex(rasCommand: string, type?:string): RegExp {
        if (!type){
            const expToMatch = rasCommand.split(' ')[0];
            console.log('new RegExp(expToMatch,\'g\')', new RegExp(expToMatch, 'g'))
            return new RegExp(expToMatch, 'g')
        }
        switch (type) {
            case 'letters':
                return /[A-Za-z]/g;
                break;
            case 'intigers':
                return /[0-9]/g;
                break;
        
            default:
                break;
        }
            

    }

    match(text: string, patternToMatch: string, options?: MatchOptions): string[] | string {
        const reg = this.createRegex(patternToMatch);
        console.log('reg', reg)
        console.log('text.match(reg)', text.match(reg))
        if (options && options.highlight && options.returnText) {

            return text.replace(patternToMatch, `*${patternToMatch}*`)
        }
    }

    matchAll(sourceText: string, type: string, options?: MatchOptions): string[] | string | object { 
        switch (type) {
            case 'letters':
                const reg = this.createRegex('all','letters')
                const matches = sourceText.match(reg)
                if (options && options.numOfMatches){
                    const matchNum = matches.length;
                    return {matches, matchNum}
                }
                return matches;

            case 'intigers':
                const regex = this.createRegex('all', 'intigers')
                const matchesInt = sourceText.match(regex)
                console.log('matchesInt', matchesInt)
                if (options && options.numOfMatches){
                    const matchNum = matchesInt.length;
                    return {matchesInt, matchNum}
                }
                return matchesInt;

        }
    }
}