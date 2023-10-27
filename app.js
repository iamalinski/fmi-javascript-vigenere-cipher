const UPPERCASE_BEGINING_IN_ASCII = 65
const LOWERCASE_BEGINING_IN_ASCII = 97
const ALPHABET_LENGTH = 26

function isUpperCase(letter) {
    letter = letter.charCodeAt()

    return Boolean(letter >= 65 && letter <= 90)
}

function isLowerCase(letter) {
    letter = letter.charCodeAt()

    return Boolean(letter >= 97 && letter <= 122)
}

function encrypt(text, key) {
    let cipher = ""

    for (let i = 0, j = 0; i < text.length; i++) {
        const currentLetter = text[i]
        const possitionOfCurrentLetterInAscii = currentLetter.charCodeAt()

        if (isUpperCase(currentLetter)) {
            const upperLetter = ((possitionOfCurrentLetterInAscii - UPPERCASE_BEGINING_IN_ASCII) + (key[j % key.length].toUpperCase().charCodeAt() - UPPERCASE_BEGINING_IN_ASCII)) % ALPHABET_LENGTH

            cipher += String.fromCharCode(upperLetter + UPPERCASE_BEGINING_IN_ASCII)
            j++
        } else if (isLowerCase(currentLetter)) {
            const lowerLetter = ((possitionOfCurrentLetterInAscii - LOWERCASE_BEGINING_IN_ASCII) + (key[j % key.length].toLowerCase().charCodeAt() - LOWERCASE_BEGINING_IN_ASCII)) % ALPHABET_LENGTH

            cipher += String.fromCharCode(lowerLetter + LOWERCASE_BEGINING_IN_ASCII)
            j++
        } else {
            cipher += currentLetter
        }
    }

    return cipher
}

document.querySelector('.send').addEventListener('click', function () {
    const textValue = document.getElementById('text')
    const keyValue = document.getElementById('key')

    if (textValue.value.length === 0) {
        alert('Моля, въведете текст!')

        return
    }

    if (keyValue.value.length === 0) {
        alert('Моля, въведете ключ!')

        return
    }

    document.querySelector('[data-name="text"] b').textContent = textValue.value
    document.querySelector('[data-name="key"] b').textContent = keyValue.value
    document.querySelector('[data-name="cypher"] b').textContent = encrypt(textValue.value, keyValue.value)

    textValue.value = ''
    keyValue.value = ''
})