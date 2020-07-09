import { MatchOptions } from "./matchOptions.interface";
export class Ras {

    constructor() { }

    createRegex(phrase?:string[], rasCommand?: string, type?:string, where?: string): RegExp {
        if (!type){
            const expToMatch = rasCommand.split(' ')[0];
            console.log('new RegExp(expToMatch,\'g\')', new RegExp(expToMatch, 'g'))
            return new RegExp(expToMatch, 'g')
        }
        if (rasCommand === 'all'){
            switch (type) {
                case 'letters':
                    return /[A-Za-z]/g;
                    break;
                case 'intigers':
                    return /[0-9]/g;
                    break;
                case 'spaces':
                    return /\s/g;
                default:
                    break;
            }
        }
        if(where && where === 'before'){
            if (rasCommand === 'all'){
                
            }
            if (phrase.length)
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

            case 'spaces':
                const regexSpace = this.createRegex('all', 'spaces')
                const matchesSpace = sourceText.match(regexSpace)
                console.log('matchesSpace', matchesSpace)
                if (options && options.numOfMatches){
                    const matchNum = matchesSpace.length;
                    return {matchesInt, matchNum}
                }
                return matchesSpace; 

        }
    }

    parse(rasExpression: string, sourceText:string ,options?: MatchOptions){
        const rasCommands = rasExpression.split(' ');
        if (rasCommands[0].toLowerCase() === 'match'){
            if (rasCommands[1].toLowerCase() === 'all'){
                const type = rasCommands[2].toLowerCase()
                const regex = this.createRegex(null,'all',type)
                const matches = sourceText.match(regex);
                if (options && options.numOfMatches){
                    return {
                        matches,
                        numOfMatches: matches.length
                    }
                }
                return sourceText.match(regex);
            }
            const phrase = rasCommands[1];
            const condition = rasCommands[2]
            const phrase2 = rasCommands[3]
            const where = rasCommands[4];
            if (where === 'before' && condition === 'have'){
                this.createRegex([phrase, phrase2],null,null,'before')
            }
        }
    }
}