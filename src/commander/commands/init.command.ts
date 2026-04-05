import { Command } from "commander";
import { createFolders } from "../../utils/general/create-app-forlder";
import { saveKeys } from "../../utils/general/create-keys";
import { generateAndStoreKeys } from "../../utils/general/generate-user-keys";


export const init = new Command('init')
    .description('create keyparis for user')
    .option('--private-key <path>', 'path of private key')
    .option('--public-key <path>', 'path of public key')
    .action(async (options) => {
        await createFolders()

        if (options.privateKey && options.publicKey) {
            return await saveKeys(options)
        }

        await generateAndStoreKeys()

    });

