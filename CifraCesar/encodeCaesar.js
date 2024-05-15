//Alphabet with 26 characeters
const alphabet = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","t","u","v","w","x","y","z"
]
//Encripter for key = jumps to right
encondeCaesar = (msg, key = 3) => {
    let msgEncoded = Array()

    for (let index = 0; index < msg.length; index++) {
        let charIndexInAlphabet = alphabet.indexOf(msg[index])
        let charIndexInAlphabetPlusKey = (charIndexInAlphabet + key) % 25 //Alphabet limit size for 0 -> 25

        msgEncoded.push(alphabet[charIndexInAlphabetPlusKey])
    }

    return msgEncoded.join('')
}
    //Encode output demonstrative
const message = "mensagem"
console.log("message:", message)
const msgEncoded = encondeCaesar(message, 3)
console.log("encoded:", msgEncoded)

//Encripter for key = jumps to left
bruteForceDecode = (msg) => {
    bruteForceResult = Array()

    for (let key = 0; key < 26; key++) {
        bruteForceResult[25 - key] = encondeCaesar(msg, key)
    }

    return bruteForceResult
}
    //Decode output demonstrative
const msgsDecoded = bruteForceDecode(msgEncoded)
console.log("decode:")
for (let index = 0; index < msgsDecoded.length; index++)
    console.log("key = " + index + " : " + msgsDecoded[index])