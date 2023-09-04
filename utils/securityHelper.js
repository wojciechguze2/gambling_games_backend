const CryptoJS = require("crypto-js");

function encodeRequestValue(unEncryptedValue) {
    return CryptoJS.AES.encrypt(
        unEncryptedValue,
        process.env.PASSPHRASE_SECRET
    ).toString()
}

function decodeRequestValue(initiallyEncryptedValue) {
    return CryptoJS.AES.decrypt(
        initiallyEncryptedValue,
        process.env.PASSPHRASE_SECRET
    ).toString(CryptoJS.enc.Utf8)
}

module.exports = {
    encodeRequestValue,
    decodeRequestValue,
}