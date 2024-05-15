#Get standard ASCII values
import string
#List base64 normal characters
base64_chars = list(string.ascii_uppercase + string.ascii_lowercase + string.digits + '+' + '/')
#Basic first order encryption for replacing duplicate pairs
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

print(newAlphabet(base64_chars, ['a', 'b', 'c', 'd', 'e', 'f', 'g']))

