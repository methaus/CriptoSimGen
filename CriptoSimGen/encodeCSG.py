#Get standard ASCII values
import string
#Basic first order encryption of replaced duplicate pairs 
def alphabetMatch(baseAlphabet: list, symbolsList: list):
    alphabetMatch = { char: None for char in baseAlphabet }
    prevChar = None
    
    for newChar in symbolsList:
        for i in range(len(baseAlphabet)):
            if alphabetMatch[baseAlphabet[i]] is None:
                alphabetMatch[baseAlphabet[i]] = str(newChar * (i + 1))
            else:
                alphabetMatch[baseAlphabet[i]] = alphabetMatch[baseAlphabet[i]].replace(prevChar * 2, newChar)

        prevChar = newChar

    return alphabetMatch

    #Alphabet Traslator output
#List base64 normal characters
base64Chars = list(string.ascii_uppercase + string.ascii_lowercase + string.digits + '+' + '/')
#Generic symbols from 1 to "n"
#Basic encryption of replaced duplicate pairs supports only 1 to 7 symbols
baseSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g'] 
basicNewAlphabetMatch = alphabetMatch(base64Chars, baseSymbols)

#Basic second order encryption of periods opposed by key
def encodeCSG(baseAlphabetMatch: dict, msg: str, password: str, spacer: str = '&'):
    baseAlphabet = tuple(baseAlphabetMatch.keys())
    symbolsOrder = list(baseAlphabetMatch.values())
    msgEncoded = list()

    for char in password:
        posInA = baseAlphabet.index(char) #Position in base Alphabet
        #Invert position of [posInA ... end] and [start ... posInA] & oppose [posInA ... end] to [end ... posInA]
        symbolsOrder[posInA:], symbolsOrder[:posInA] = symbolsOrder[:posInA], list(reversed(symbolsOrder[posInA:]))

    finalAlphabetMatch = { baseAlphabet[i]: symbolsOrder[i] for i in range(len(baseAlphabet)) }

    for char in msg:
        msgEncoded.append(finalAlphabetMatch[char] + spacer)

    return ''.join(msgEncoded)

    #Encode with password output demonstrative
message = "mensagem"
print("message:", message)
password = "password"
print("password:", password)
msgEncoded = encodeCSG(basicNewAlphabetMatch, message, password)
print("encoded:", msgEncoded)

def decodeCSG(baseAlphabetMatch: dict, msg: str, password: str, spacer: str):
    baseAlphabet = tuple(baseAlphabetMatch.keys())
    symbolsOrder = list(baseAlphabetMatch.values())
    msgDecoded = list()

    for char in password:
        posInA = baseAlphabet.index(char) #Position in base Alphabet
        #Invert position of [posInA ... end] and [start ... posInA] & oppose [posInA ... end] to [end ... posInA]
        symbolsOrder[posInA:], symbolsOrder[:posInA] = symbolsOrder[:posInA], list(reversed(symbolsOrder[posInA:]))

    finalAlphabetMatch = { symbolsOrder[i]: baseAlphabet[i] for i in range(len(baseAlphabet)) }

    msg = msg.split(spacer)
    for char in msg:
        if char != '':
            msgDecoded.append(finalAlphabetMatch[char])

    return ''.join(msgDecoded)

msgDecoded = decodeCSG(basicNewAlphabetMatch, msgEncoded, password, "&")
print("Decoded:", msgDecoded)