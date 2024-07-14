import { decryptData } from "./utils/decrypto";
import { encryptData } from "./utils/encrypt";
import { generateKeyPairs } from "./utils/key-pairs";
import { signData, verifyData } from "./utils/sign-verify";
import { signCombinedData, verifyCombinedData } from "./utils/sign-verify.complex";

const rs = generateKeyPairs();
/* const encryptedData = encryptData(rs.publicKey, Buffer.from("hello im ruzi"));
const decryptedData = decryptData(rs.privateKey, encryptedData);
 */
const signedData = signCombinedData(rs.privateKey, "hello im signed msg");
 const verifedData = verifyCombinedData(rs.publicKey,signedData);
console.log(verifedData); 

