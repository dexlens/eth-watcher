/**
 * Main entry point for watcher
 */
import { Bot } from "npm:grammy";
import dotenv from "npm:dotenv";
dotenv.config();
const bot = new Bot(process.env.TELE_BOT_TOKEN);
import {
    setupEthWatcherWebsocket,
    openEthWatcherWebsocket
} from "./functions.ts";
import { parseChainEvents } from "./shared/functions/parseChainEvents.ts";
import { formatValueToCurrency } from "./shared/functions/formatValueToCurrency.ts";
import { sendMessageToTelegram } from "./shared/functions/sendMessageToTelegram.ts";

/**
 * Here we define some global variables
 */
let moneySeen = 0; 
let transactionsSeen = 0; 
let fullData = {}; 

/**
 * Connect to the Ethereum watcher websocket
 */
async function connectToEthWatcher() {
    try {
        const ws = setupEthWatcherWebsocket();
        await openEthWatcherWebsocket(ws);
        ws.on("message", async (data: any) => {
            try {
                const { 
                    moneySeen: newMoneySeen,
                    transactionsSeen: newTransactionsSeen,
                    currentRoundMoneySeen,
                    currentRoundTransactionsSeen,
                    fullData: newFullData,
                    currentRoundData
                } = await parseChainEvents(data, {
                    moneySeen,
                    transactionsSeen,
                    fullData
                });
                moneySeen = newMoneySeen;
                transactionsSeen = newTransactionsSeen;
                fullData = newFullData;
                await sendMessageToTelegram(currentRoundData, fullData, {
                    moneySeen,
                    transactionsSeen,
                    currentRoundMoneySeen,
                    currentRoundTransactionsSeen
                });
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);
    }
}

connectToEthWatcher();
