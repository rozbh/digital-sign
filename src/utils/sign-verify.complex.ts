import { signData, verifyData } from "./sign-verify";

export function signCombinedData(privateKey: string, data: string) {
  const signature = signData(privateKey, data);
  return `${Buffer.from(data).toString("base64")}.${signature.toString(
    "base64"
  )}`;
}
export function verifyCombinedData(publicKey: string, combinedData: string) {
  const splitedData = combinedData.split(".");

  return verifyData(
    publicKey,
    Buffer.from(splitedData[0], "base64").toString(),
    Buffer.from(splitedData[1], "base64")
  );
}
