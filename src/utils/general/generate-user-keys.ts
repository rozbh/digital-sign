import { mkdir, writeFile, stat } from "fs/promises";
import path from "path";
import os from "os";
import { generateKeyPairs } from "../key-pairs";
import { getBaseDir, getUserDir } from "../../getters/getter";

export async function generateAndStoreKeys() {
    const baseDir =getBaseDir()
    const userDir = getUserDir()

    // Ensure folder exists
    await mkdir(userDir, { recursive: true, mode: 0o700 });

    const privateKeyPath = path.join(userDir, "private.key");
    const publicKeyPath = path.join(userDir, "public.key");

    // Check if both key files already exist
    try {
        await stat(privateKeyPath);
        await stat(publicKeyPath);
        
        console.log("Private key:", privateKeyPath);
        console.log("Public key:", publicKeyPath);

        console.log("Keys already exist ✅");
        return { privateKeyPath, publicKeyPath }; // skip generation
    } catch {
        // one or both keys are missing → generate new keys
    }

    // --- Generate RSA key pair ---
    const { publicKey, privateKey } = generateKeyPairs();

    // --- Save private key ---
    await writeFile(privateKeyPath, privateKey, { mode: 0o600 });

    // --- Save public key ---
    await writeFile(publicKeyPath, publicKey, { mode: 0o600 });

    console.log("Keys generated and saved successfully ✅");
    console.log("Private key:", privateKeyPath);
    console.log("Public key:", publicKeyPath);

    return { privateKeyPath, publicKeyPath };
}