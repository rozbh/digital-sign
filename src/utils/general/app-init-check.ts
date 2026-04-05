import { stat } from "fs/promises";
import path from "path";
import os from "os";

export async function initializeApp() {
    const userDir = path.join(os.homedir(), ".ases-ruzi", "user");
    const buddyDir = path.join(os.homedir(), ".ases-ruzi", "buddys-keys");

    const privateKeyPath = path.join(userDir, "private.key");
    const publicKeyPath = path.join(userDir, "public.key");

    try {
        // Check if both key files exist
        await stat(privateKeyPath);
        await stat(publicKeyPath);
        await stat(buddyDir);

        console.log("Keypairs exist ✅");
        return true; // keys exist, no need to generate
    } catch {
        console.log("Keypairs missing ❌");
        return false; // keys missing, need to generate
    }
}