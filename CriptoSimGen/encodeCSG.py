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
#List of common reading character set
baseChars = ["a", "b", "c", "d", "e", "f"]
#Generic symbols from 1 to "n"
baseSymbols = ['a', 'b', 'c'] 
baseAlphabetMatch = alphabetMatch(baseChars, baseSymbols)
print("baseAlphabetMatch:", baseAlphabetMatch)

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
    print(finalAlphabetMatch)

    for char in msg:
        msgEncoded.append(finalAlphabetMatch[char] + spacer)

    return ''.join(msgEncoded)

    #Encode with password output demonstrative
message = "abcdf"
print("message:", message)
password = "c"
print("password:", password)
print("newAlphabetMatch:")
msgEncoded = encodeCSG(baseAlphabetMatch, message, password)
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

msgDecoded = decodeCSG(baseAlphabetMatch, msgEncoded, password, "&")
print("Decoded:", msgDecoded)