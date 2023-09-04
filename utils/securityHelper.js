const CryptoJS = require("crypto-js");

function encodeRequestPassword(unEncryptedPassword) {
    return CryptoJS.AES.encrypt(
        unEncryptedPassword,
        process.env.PASSPHRASE_SECRET
    ).toString()
}

function decodeRequestPassword(initiallyEncryptedPassword) {
    return CryptoJS.AES.decrypt(
        initiallyEncryptedPassword,
        process.env.PASSPHRASE_SECRET
    ).toString(CryptoJS.enc.Utf8)
}

module.exports = {
    encodeRequestPassword,
    decodeRequestPassword,
}