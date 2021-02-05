import { MatchOptions } from "./matchOptions.interface";
export class Ras {

    constructor() { }

    createRegex(phrase?: string[], rasCommand?: string, type?: string, where?: string): RegExp {
        console.log('type', type)
        if (!type) {
            const expToMatch = rasCommand.split(' ')[0];
            console.log('new RegExp(expToMatch,\'g\')', new RegExp(expToMatch, 'g'))
            return new RegExp(expToMatch, 'g')
        }
        if (rasCommand === 'all') {
            console.log('type', type)
            switch (type) {
                case 'letters':
                    return /[A-Za-z]/g;
                    break;
                case 'numbers':
                    return /[0-9]/g;
                    break;
                case 'spaces':
                    return /\s/g;
                case 'words':
                    return /\b\w+\b/g;
            }
        }
        // if(where && where === 'before'){
        //     if (rasCommand === 'all'){

        //     }
        //     if (phrase.length)
        // }


    }

    match(text: string, patternToMatch: string, options?: MatchOptions): string[] | string {
        const patternToMatchSplit = patternToMatch.split(' ');
        const reg = this.createRegex(patternToMatchSplit);
        if (options && options.highlight && options.returnText) {
            return text.replace(patternToMatch, `*${patternToMatch}*`)
        };
    };

    matchAll(sourceText: string, type: string, options?: MatchOptions): string[] | string | object {
        switch (type) {
            case 'letters':
                const reg = this.createRegex(null, 'all', 'letters')
                const matches = sourceText.match(reg)
                if (options && options.numOfMatches) {
                    const matchNum = matches.length;
                    return { matches, matchNum }
                }
                return matches;

            case 'intigers':
                const regex = this.createRegex(null, 'all', 'intigers')
                const matchesInt = sourceText.match(regex)
                console.log('matchesInt', matchesInt)
                if (options && options.numOfMatches) {
                    const matchNum = matchesInt.length;
                    return { matchesInt, matchNum }
                }
                return matchesInt;

            case 'spaces':
                const regexSpace = this.createRegex(null, 'all', 'spaces')
                const matchesSpace = sourceText.match(regexSpace)
                console.log('matchesSpace', matchesSpace)
                if (options && options.numOfMatches) {
                    const matchNum = matchesSpace.length;
                    return { matchesInt, matchNum }
                }
                return matchesSpace;

        }
    }

    parse(rasExpression: string, sourceText: string, options?: MatchOptions) {
        if (this.checkStrucure(rasExpression)) {
            const rasCommands = rasExpression.split(' ');
            if (rasCommands[0].toLowerCase() === 'match') {
                if (rasCommands[1].toLowerCase() === 'all') {
                    const type = rasCommands[2].toLowerCase();
                    const regex = this.createRegex(null, 'all', type)
                    const matches = sourceText.match(regex);
                    if (options && options.numOfMatches) {
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
                if (where === 'before' && condition === 'have') {
                    this.createRegex([phrase, phrase2], null, null, 'before')
                }
            }
        } else {
            return { error: 'error in parsing ras expression' };
        }
    }

    checkStrucure(rasExpression: string): boolean {
        let isValid = false;
        // the current correct structure is:
        // 1. must have "match" at start.
        // 2. must follow: quantity-indicator: any, n, all.
        // 3. after quantity, must be type: letters,spaces,words, phrase (marked with prenthesis)
        // 4. after - can be conditions, marked inside curly braces and where:  where{}.
        // 4.2 after "weher must be: have/havn't"
        // condition phrase - same as 2-3 above

        // check if the expression starts with "match"
        const expresstinWordSplitted = rasExpression.split(" ");
        if (expresstinWordSplitted[0]!.toLowerCase() !== 'match') {
            console.error('ras expression must start with "match". currently is: ', expresstinWordSplitted[0]);
            return isValid;
        }

        // check if there is a quantity after match
        const quantity = expresstinWordSplitted[1].toLowerCase();
        if (quantity !== 'any' && quantity !== 'all') {
            if (Number.isNaN(parseInt(quantity))) {
                console.error('err: ras expression must have quantity phrase after match - like any, all or a number. Currenlty is: ', expresstinWordSplitted[1]);
                return isValid;
            }
        }

        // check if after quantity there is type:
        const type = expresstinWordSplitted[2];
        if (type !== 'numbers' && type !== 'letters' && type !== 'words') {
            // if type is not a phrase
            if (type[0] !== '(') {
                console.error('A type must follow the quantity, like: "numbers/lettes/(phrase)". Currently is: ', type);
                return isValid;
            }
        }

        isValid = true;
        return isValid;
    }

    checkConditionStructure(rasCondition: string) {

    }

    checkErrors(rasExpression: string) {
        // this function checks the general strucure of the RAS expression, and reuturn an error msg if the structure is wrong
        const splittedRasEXP = rasExpression.split(' ');
        const results: { isOk: boolean, msg: string[] } = { isOk: true, msg: [] };
        // check if query start with "match"
        if (splittedRasEXP[0] !== "match") {
            results.isOk = false;
            results.msg.push('RAS expression must start with "match"')
        }
    }
}