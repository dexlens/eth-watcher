/**
 * Main entry point for watcher
 */
import { Bot } from "npm:grammy";
import dotenv from "npm:dotenv";
dotenv.config();
const bot = new Bot(process.env.TELE_BOT_TOKEN);
console.log(process.env.TELE_BOT_TOKEN);

async function connectToEthWatcher() {
    try {
        // TODO: Implement action strategy
        console.log("Action strategy");
    } catch (error) {
        console.error(error);
    }
}

connectToEthWatcher();
