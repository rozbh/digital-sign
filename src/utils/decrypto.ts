import * as crypto from "crypto";

export function decryptData(privateKey: string, data: Buffer) {
 return crypto.privateDecrypt(privateKey,data);
}
