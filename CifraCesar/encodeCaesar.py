#Alphabet with 26 characeters
alphabet = [
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","t","u","v","w","x","y","z"
]
#Encripter for key = jumps to right
def encondeCaesar(msg: str, key: int = 3):
    msgEncoded = list()

    for char in msg:
        charIndexInAlphabet = alphabet.index(char)
        charIndexInAlphabetPlusKey = (charIndexInAlphabet + key) % (len(alphabet) - 1 - 1) #Alphabet limit size for 0 -> 25 = 26 - 1 (key1 = no jump) - 1 (start in 0 not 1)

        msgEncoded.append(alphabet[charIndexInAlphabetPlusKey])


    return ''.join(msgEncoded)

    #Encode output demonstrative
message = "mensagem"
print("message:", message)
msgEncoded = encondeCaesar(message, 3)
print("encoded:", msgEncoded)

#Encripter for key = jumps to left
def bruteForceDecode(msg: str):
    bruteForceResult = dict()

    for key in range(26):
        bruteForceResult[25 - key] = encondeCaesar(msg, key)


    return bruteForceResult

    #Decode output demonstrative
msgsDecoded = bruteForceDecode(msgEncoded)
print("decode:")
for item in msgsDecoded:
    print("key =", item, ":", msgsDecoded[item])
