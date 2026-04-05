import { stat } from "fs/promises";
import path from "path";
import os from "os";
import { getBuddyDir, getUserDir } from "../../getters/getter";

export async function initializeApp() {
    const userDir = getUserDir()
    const buddyDir = getBuddyDir()

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