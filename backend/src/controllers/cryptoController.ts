var CryptoJS = require("crypto-js");

export let encrypt = (text: string) => {
    var ciphertext = CryptoJS.AES.encrypt(text, 'secretkey').toString();
    return ciphertext;
}

export let decrypt = (ciphertext: any) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'secretkey');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
