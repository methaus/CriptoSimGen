//Basic first order encryption of replaced duplicate pairs 
const alphabetMatch = (baseAlphabet, symbolsList) => {
    let alphabetMatch = {}; for (let char of baseAlphabet) alphabetMatch[char] = null
    let prevChar = null

    symbolsList.forEach(newChar => {
        for (let i = 0; i < baseAlphabet.length; i++) {
            if (alphabetMatch[baseAlphabet[i]] == null)
                alphabetMatch[baseAlphabet[i]] = String(newChar.repeat(i + 1))
            else
                alphabetMatch[baseAlphabet[i]] = alphabetMatch[baseAlphabet[i]].replaceAll(prevChar.repeat(2), newChar)
        }
        prevChar = newChar
    })
    return alphabetMatch
}
    //Alphabet Traslator output
//List of common reading character set
const baseChars = ["a", "b", "c", "d", "e", "f"]
//Generic symbols from 1 to "n"
const baseSymbols = ['a', 'b', 'c'];
const baseAlphabetMatch = alphabetMatch(baseChars, baseSymbols);
console.log("baseAlphabetMatch:", baseAlphabetMatch)

//Basic second order encryption of periods opposed by key
const encodeCSG = (baseAlphabetMatch, msg, password, spacer = '&') => {
    const baseAlphabet = Object.keys(baseAlphabetMatch)
    let symbolsOrder = baseAlphabet.map(key => { return baseAlphabetMatch[key] })
    let msgEncoded = Array()

    for (let i = 0; i < password.length; i++) {
        let posInA = baseAlphabet.indexOf(password[i]) //Position in base Alphabet
        //Invert position of periods [posInA ... end] and [start ... posInA]
        symbolsOrder = symbolsOrder.slice(posInA).reverse().concat(symbolsOrder.slice(0, posInA))
    }
    let finalAlphabetMatch = {}; for (let i = 0; i < baseAlphabet.length; i++) finalAlphabetMatch[baseAlphabet[i]] = symbolsOrder[i]
    console.log(finalAlphabetMatch)

    for (let i = 0; i < msg.length; i++) {
        msgEncoded.push(finalAlphabetMatch[msg[i]] + spacer)
    }
    return msgEncoded.join('')
}
    //Encode with password output demonstrative
const message = "abcdf"
console.log("message:", message)
const password = "c"
console.log("password:", password)
console.log("newAlphabetMatch:")
const msgEncoded = encodeCSG(baseAlphabetMatch, message, password)
console.log("encoded:", msgEncoded)

const decodeCSG = (baseAlphabetMatch, msg, password, spacer) => {
    const baseAlphabet = Object.keys(baseAlphabetMatch)
    let symbolsOrder = baseAlphabet.map(key => { return baseAlphabetMatch[key] })
    let msgDecoded = Array()

    for (let i = 0; i < password.length; i++) {
        let posInA = baseAlphabet.indexOf(password[i]) //Position in base Alphabet
        //Invert position of periods [posInA ... end] and [start ... posInA]
        symbolsOrder = symbolsOrder.slice(posInA).reverse().concat(symbolsOrder.slice(0, posInA))
    }
    let finalAlphabetMatch = {}; for (let i = 0; i < baseAlphabet.length; i++) finalAlphabetMatch[symbolsOrder[i]] = baseAlphabet[i]

    msg = msg.split(spacer)
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] != '')
            msgDecoded.push(finalAlphabetMatch[msg[i]])
    }
    return msgDecoded.join('')
}
const msgDecoded = decodeCSG(baseAlphabetMatch, msgEncoded, password, "&")
console.log("Decoded:", msgDecoded)