import * as crypto from "crypto";

export function signData(privateKey: string, data: string) {
  return crypto.sign("sha256", Buffer.from(data), privateKey);
}
export function verifyData(publicKey: string, data: string, signature: Buffer) {
  return crypto.verify(undefined, Buffer.from(data), publicKey, signature);
}
