

//Basic first order encryption of replaced duplicate pairs 
const newAlphabet = (baseAlphabet, symbolsList) => {
    let newAlphabet = {}; for (let char of baseAlphabet) newAlphabet[char] = null
    let prevChar = null

    symbolsList.forEach(newChar => {
        for (let i = 0; i < baseAlphabet.length; i++) {
            if (newAlphabet[baseAlphabet[i]] == null)
                newAlphabet[baseAlphabet[i]] = String(newChar.repeat(i + 1))
            else
                newAlphabet[baseAlphabet[i]] = newAlphabet[baseAlphabet[i]].replaceAll(prevChar.repeat(2), newChar)
        }
        prevChar = newChar
    })
    return newAlphabet
}
    //Alphabet Traslator output
//List base64 normal characters
const base64Chars = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).concat(Array.from(Array(26), (_, i) => String.fromCharCode(97 + i))).concat(Array.from(Array(10), (_, i) => String(i))).concat(['+', '/'])
//Generic symbols from 1 to "n"
//Basic encryption of replaced duplicate pairs supports only 1 to 7 symbols
const baseSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const basicAlphabetTraslator = newAlphabet(base64Chars, baseSymbols);
console.log(basicAlphabetTraslator)
//Basic second order encryption of periods inverted by key
const encodeCSG = (alphabetTranslator, msg, password, spacer = '&') => {
    const baseAlphabet = Object.keys(alphabetTranslator)
    let symbolsOrder = baseAlphabet.map(key => { return alphabetTranslator[key] })
    let passwordTranslated = Array()
    let msgEncoded = Array()

    for (let i = 0; i < password.length; i++) {
        let posInA = baseAlphabet.indexOf(password[i]) //Position in base Alphabet
        //Invert position of periods [posInA ... end] and [start ... posInA]
        symbolsOrder = symbolsOrder.slice(posInA).concat(symbolsOrder.slice(0, posInA))

        passwordTranslated.push(alphabetTranslator[password[i]] + spacer)
    }
    msgEncoded = msgEncoded.concat(passwordTranslated)
    let finalAlphabet = {}; for (let i = 0; i < baseAlphabet.length; i++) finalAlphabet[baseAlphabet[i]] = symbolsOrder[i]
    
    for (let i = 0; i < msg.length; i++) {
        msgEncoded.push(finalAlphabet[msg[i]] + spacer)
    }
    return msgEncoded.join('')
}
    //Encode with password output demonstrative
const message = "mensagem"
console.log("message:", message)
const password = "password"
console.log("password:", password)
const msgEncoded = encodeCSG(basicAlphabetTraslator, message, password)
console.log("encoded:", msgEncoded)