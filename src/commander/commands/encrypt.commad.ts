
import { Command } from "commander";

import { readBuddyKey } from "../../utils/general/buddy-keys";
import { encryptData } from "../../utils/encrypt";

export const encrypt = new Command("enc-to-buddy")
    .description("Encrypt a message for a buddy using their public key")
    .option("--name <string>", "Name of buddy key file")
    .option("--txt <string>", "Content of message for buddy")
    .action(async (options) => {
        // ✅ Validate inputs
        if (!options.name) {
            console.error("Error: --name is required");
            process.exit(1);
        }
        if (!options.txt) {
            console.error("Error: --txt is required");
            process.exit(1);
        }

        // 🔑 Read buddy public key
        let publicKey: string;
        try {
            publicKey = readBuddyKey(options.name);
        } catch (err: any) {
            console.error(err.message);
            process.exit(1);
        }

        // ✅ Encrypt text using public key
        try {
            const buffer = Buffer.from(options.txt, "utf-8");
            const encrypted = encryptData(publicKey, buffer)

            console.log("Encrypted message (base64):");
            console.log(encrypted.toString("base64"));
        } catch (err: any) {
            console.error("Error encrypting message:", err.message);
            process.exit(1);
        }
    });