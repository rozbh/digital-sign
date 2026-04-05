import { Command } from 'commander';
import * as commands from './commands/index'
import { initializeApp } from '../utils/general/app-init-check';
const program = new Command();

program
    .name('AES-ENC')
    .description('CLI app for encrypting apps')
    .version('0.0.1');


// register all commands dynamically
Object.values(commands).forEach((cmd) => {
    program.addCommand(cmd);
});


// 🔥 Pre-run initializer
program.hook("preAction", async (thisCommand, actionCommand) => {
    // this runs before every command
    console.log("Initializing app...");

    if (actionCommand.name() === "init") return;

    // Example: check config, load DB, create folders
    await initializeApp();

    console.log("App initialized ✅");
});



program.parse();

