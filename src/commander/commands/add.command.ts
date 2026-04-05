import { Command } from "commander";
import path from "path";
import fs from "fs";
import { saveBuddyKey } from "../../utils/general/buddy-keys";

export const addBuddy = new Command("buddy")
    .description("Add a buddy public key")
    .option("--public-key-file <path>", "Path of public key file")
    .option("--public-key <string>", "Content of public key")
    .option("--name <filename>", "Name for the buddy key file") // new option
    .action(async (options) => {
        const hasFile = !!options.publicKeyFile;
        const hasContent = !!options.publicKey;

        // ❌ Validate mutually exclusive
        if (hasFile === hasContent) {
            console.error(
                "Error: You must provide exactly one of --public-key-file or --public-key"
            );
            process.exit(1);
        }

        // ✅ Validate that a name is provided
        if (!options.name) {
            console.error("Error: You must provide a --name for the buddy key file");
            process.exit(1);
        }

        let publicKey: string;

        if (hasFile) {
            const filePath = path.resolve(options.publicKeyFile);
            if (!fs.existsSync(filePath)) {
                console.error("Error: Public key file does not exist:", filePath);
                process.exit(1);
            }
            publicKey = fs.readFileSync(filePath, "utf-8");
            console.log("Loaded public key from file:", filePath);
        } else {
            publicKey = options.publicKey;
            console.log("Using provided public key content");
        }

        const outputFilePath = await saveBuddyKey(options.name, publicKey)
        console.log(`Buddy public key saved as: ${outputFilePath}`);
    });