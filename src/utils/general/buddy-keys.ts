import path from "path";
import fs from "fs";
import os from "os";
import { getBuddyDir } from "../../getters/getter";

// Central folder for buddy keys
export const buddyDir = getBuddyDir()

/**
 * Ensure the buddy folder exists
 */
export function ensureBuddyFolder() {
    if (!fs.existsSync(buddyDir)) {
        fs.mkdirSync(buddyDir, { recursive: true });
        console.log("Created buddy keys folder:", buddyDir);
    }
}

/**
 * Save a buddy key
 * @param name filename (without extension)
 * @param content key content
 */
export function saveBuddyKey(name: string, content: string) {
    ensureBuddyFolder();
    const filePath = path.join(buddyDir, `${name}.pub`);

    if (fs.existsSync(filePath)) {
        throw new Error(`Buddy key file already exists: ${filePath}`);
    }

    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Buddy key saved: ${filePath}`);
    return filePath;
}

/**
 * Read a buddy key by name
 * @param name filename (without extension)
 */
export function readBuddyKey(name: string) {
    const filePath = path.join(buddyDir, `${name}.pub`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Buddy key file not found: ${filePath}`);
    }
    return fs.readFileSync(filePath, "utf-8");
}

/**
 * List all buddy key files
 */
export function listBuddyKeys() {
    ensureBuddyFolder();
    return fs.readdirSync(buddyDir)
        .filter((f) => f.endsWith(".pub"))
        .map((f) => path.basename(f, ".pub"));
}