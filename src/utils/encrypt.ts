import * as crypto from "crypto";
type keypairs = {
  privateKey: string;
  publicKey: string;
};
export function encryptData(publicKey: string, data: Buffer) {
  return crypto.publicEncrypt(publicKey, data);
}
