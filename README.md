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
        'match all <type>'. This is need to be amended in the future, but I follow the rule of first build simple. First lets see we have a package that works, and later twick an better it. Perfect is the enemy of the good.
        
