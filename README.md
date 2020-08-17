RAS Project:
-----------------

About:

    The problem: 
        regex are powerfull tools, but the lack in readability.
        take this regex for password validation, that should include uppercase letter, lowercase letter, length of at least 8 and special symbol:
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$"
        
        even if you are regex efficionado it might take you a few readings to get what is being matched here, and if you are just regular mortal developer then a day after you write such a thing you wont remmber what it does, and you will have to use comments.


    The solution:
        I wanted to make regex readable. When thingking about how to achieve it, I thought about a langauge that is declerative in nature, and thus is prefectly readble - SQL.
        SQL is written almost like natural english, and describes exactly what you intent to do.
        And so RAS was born - Regex As SQL. The goal of this project is to build an npm package that transforms SQL-like command into regular expression, so anyone can use the full capabilities of regex without using messy, unclear and hard to understand syntax.

DEV Log:
    7.8.20:
        started the project. currently there are many assumptions regrding the structure of the ras command. match all commands, for example, is allways assumed to by of this form: 
        'match all type'. This is need to be amended in the future, but I follow the rule of first build simple. First lets see we have a package that works, and later twick an better it. Perfect is the enemy of the good.

    8.8.20
        I think that thet mothod of guessing the ras command structure will be to hard to refactor after the fact. I think its better to search for keywords in the ras text command, and orginize the command in a nested form - so in the end everything will be joined and could be send back to the user.
        the basic strucure is:

        MUST: 1st word will allways be "match" or "group".
        NOT MUST: in 2nd the can be:
            quantity:
                any, n, none (everything but)
            ONLY IF QUANTITY WAS SPECIFIED:
                in 4th: type:
                    letters
                    intigers
                    words
                    spaces
            else:
            MUST (if no quantitiy + type) phrase:
                the main word or words to match in this specific ras command
            NOT MUST:
                condition: 
                    have,
                    havn't
                after condition:
                    another ras chian same as before
                    in condition can add length condition
                    after chain -
                    NOT MUST:
                        position:
                            before,
                            after
        examples:
            match all letters have le before
            match jessey havn't sr. after
            match all Yishai have mr or mrs before and the great after
            match email
            match password have length greater than 8 and 1 lower case and 1 uppercase and 1 special symbol

        Intresting problem: how to parse sql like statment?
            you don't want to assume exactly how the query will look like, since the user will allways be able to suprise you. You don't want to be to strict and riggid ether.
        one way is to maps what word/s can come before or after each keyword.

    17.8
        cont - parsing
            one way to manage the parsing is to assign special symbols to mark the biggening and the ending of certain phrases. For example, the condition can be marked with {} after "where", adn so you don't need to guess when the condition starts and ends. The downside to this is less SQL syntax and more code like sytanx. Still, I think I will start with such solution, and maybe change it later on.
            So currently, these are the rules for RAS:
            1. every quesry must start with "match".
            2. after "match" a qualifier must come. qulifiers can be:
                2.1 any
                2.2 n
                2.3 all
            3. after qualifier, there most be a type. a type can be:
                3.1 letters
                3.2 spaces
                3.3 words
                3.4 specific phrase - "help"/"i need" etc.
            4. after the type, conditions can be added. There can be none, one or more conditions. A condition is marked by starting with "where" (must). After the "where" there must be curly braces "{}" in which the condition will be specified.
                4.1 conditions are structed like so:
                    a. condition starts with "have"/"havn't"
                    b. condition pharse. same structure as regular phrase - from steps 2 to 3 above.
            5. after all conditions, there must be ";"
            6. after the query is done, options can be added in in object. options include:
                6.1 highlight = return the original text to preform the search on with "*" before and after the matches.
                6.2 number of matches
                6.3 return the text - should RAS return the txt at all, or aonly the reults.
                6.4 showIndices = return the indices of the matches in the original text.


             
