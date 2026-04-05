import { Command } from "commander";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import os from "os";
import { getPrivateKeyPath } from "../../getters/getter";

export const decrypt = new Command("decrypt")
    .description("Decrypt a message using your private key")
    .option("--encrypted-txt <string>", "Encrypted base64 message")
    .action(async (options) => {
        if (!options.encryptedTxt) {
            console.error("Error: --encrypted-txt is required");
            process.exit(1);
        }

        // 📂 Load private key (adjust path to your setup)
        const privateKeyPath =getPrivateKeyPath()
        
        if (!fs.existsSync(privateKeyPath)) {
            console.error("Error: Private key not found:", privateKeyPath);
            process.exit(1);
        }

        const privateKey = fs.readFileSync(privateKeyPath, "utf-8");

        try {
            // 🔐 Convert base64 → buffer
            const encryptedBuffer = Buffer.from(options.encryptedTxt, "base64");

            // ⚡ Fix TS issue with subarray()
            const decrypted = crypto.privateDecrypt(
                privateKey,
                encryptedBuffer.subarray()
            );

            console.log("Decrypted message:");
            console.log(decrypted.toString("utf-8"));
        } catch (err: any) {
            console.error("Error decrypting message:", err.message);
            process.exit(1);
        }
    });
