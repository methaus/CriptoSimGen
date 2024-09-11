

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
//List base64 normal characters
const base64Chars = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).concat(Array.from(Array(26), (_, i) => String.fromCharCode(97 + i))).concat(Array.from(Array(10), (_, i) => String(i))).concat(['+', '/'])
//Generic symbols from 1 to "n"
//Basic encryption of replaced duplicate pairs supports only 1 to 7 symbols
const baseSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const basicNewAlphabetMatch = alphabetMatch(base64Chars, baseSymbols);

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

    for (let i = 0; i < msg.length; i++) {
        msgEncoded.push(finalAlphabetMatch[msg[i]] + spacer)
    }
    return msgEncoded.join('')
}
    //Encode with password output demonstrative
const message = "mensagem"
console.log("message:", message)
const password = "password"
console.log("password:", password)
const msgEncoded = encodeCSG(basicNewAlphabetMatch, message, password)
console.log("encoded:", msgEncoded)

const decodeCSG = (baseAlphabetMatch, msg, password, spacer) => {
    const baseAlphabet = Object.keys(baseAlphabetMatch)
    let symbolsOrder = baseAlphabet.map(key => { return baseAlphabetMatch[key] })
    let msgDecoded = Array()

    for (let i = 0; i < password.length; i++) {
        let posInA = baseAlphabet.indexOf(password[i]) //Position in base Alphabet
        //Invert position of periods [posInA ... end] and [start ... posInA]
        symbolsOrder = symbolsOrder.slice(posInA).concat(symbolsOrder.slice(0, posInA))
    }
    let finalAlphabetMatch = {}; for (let i = 0; i < baseAlphabet.length; i++) finalAlphabetMatch[symbolsOrder[i]] = baseAlphabet[i]

    msg = msg.split(spacer)
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] != '')
            msgDecoded.push(finalAlphabetMatch[msg[i]])
    }
    return msgDecoded.join('')
}
const msgDecoded = decodeCSG(basicNewAlphabetMatch, msgEncoded, password, "&")
console.log("Decoded:", msgDecoded)