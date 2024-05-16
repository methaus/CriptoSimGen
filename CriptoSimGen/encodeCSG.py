#Get standard ASCII values
import string
#Basic first order encryption of replaced duplicate pairs 
def newAlphabet(baseAlphabet: list, symbolsList: list):
    newAlphabet = { char: None for char in baseAlphabet }
    prevChar = None
    
    for newChar in symbolsList:
        for i in range(len(baseAlphabet)):
            if newAlphabet[baseAlphabet[i]] is None:
                newAlphabet[baseAlphabet[i]] = str(newChar * (i + 1))
            else:
                newAlphabet[baseAlphabet[i]] = newAlphabet[baseAlphabet[i]].replace(prevChar * 2, newChar)

        prevChar = newChar

    return newAlphabet

    #Alphabet Traslator output
#List base64 normal characters
base64Chars = list(string.ascii_uppercase + string.ascii_lowercase + string.digits + '+' + '/')
#Generic symbols from 1 to "n"
#Basic encryption of replaced duplicate pairs supports only 1 to 7 symbols
baseSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g'] 
basicAlphabetTraslator = newAlphabet(base64Chars, baseSymbols)

#Basic second order encryption of periods inverted by key
def encodeCSG(alphabetTranslator: dict, msg: str, password: str, spacer: str = '&'):
    baseAlphabet = tuple(alphabetTranslator.keys())
    symbolsOrder = list(alphabetTranslator.values())
    passwordTranslated = list()
    msgEncoded = list()

    for char in password:
        posInA = baseAlphabet.index(char) #Position in base Alphabet
        #Invert position of periods [posInA ... end] and [start ... posInA]
        symbolsOrder[posInA:], symbolsOrder[:posInA] = symbolsOrder[:posInA], symbolsOrder[posInA:]

        passwordTranslated.append(alphabetTranslator[char] + spacer)

    msgEncoded.extend(passwordTranslated)
    finalAlphabet = { baseAlphabet[i]: symbolsOrder[i] for i in range(len(baseAlphabet)) }
    
    for char in msg:
        msgEncoded.append(finalAlphabet[char] + spacer)

    return ''.join(msgEncoded)

    #Encode with password output demonstrative
message = "mensagem"
print("message:", message)
password = "password"
print("password:", password)
msgEncoded = encodeCSG(basicAlphabetTraslator, message, password)
print("encoded:", msgEncoded)
