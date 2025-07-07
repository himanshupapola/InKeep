import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const LOCAL_KEY = "diary_simple_key";

export function encryptText(text, passphrase) {
  return CryptoJS.AES.encrypt(text, passphrase).toString();
}

export function decryptText(encrypted, passphrase) {
  const bytes = CryptoJS.AES.decrypt(encrypted, passphrase);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export default function useEncryption() {
  const [passphrase, setPassphrase] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) setPassphrase(stored);
    setIsLoaded(true);
  }, []);

  const setKey = (phrase) => {
    localStorage.setItem(LOCAL_KEY, phrase);
    setPassphrase(phrase);
  };

  const clearKey = () => {
    localStorage.removeItem(LOCAL_KEY);
    setPassphrase(null);
  };

  const encrypt = (plainText) => {
    if (!passphrase) throw new Error("No key set");
    return encryptText(plainText, passphrase);
  };

  const decrypt = (cipherText) => {
    if (!passphrase) throw new Error("No key set");
    return decryptText(cipherText, passphrase);
  };

  return {
    passphrase,
    setKey,
    clearKey,
    encrypt,
    decrypt,
    isLoaded,
  };
}
