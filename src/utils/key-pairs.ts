import * as crypto from "crypto";

export function generateKeyPairs() {
  const rs = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,        // very strong RSA key
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  return rs
}
