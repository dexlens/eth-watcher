/**
 * Shared functions file to import stuff from inside the shared protected folder
 * For access, get access to the Arweave for cloning the shared folder
 */

/**
 * Setup Eth Watcher Websocket
 */
export {
    setupEthWatcherWebsocket
} from "./shared/functions/setupEthWatcherWebsocket.ts";

/**
 * Open Eth Watcher Websocket and subscribe to the ETH Dex signals
 */
export {
    openEthWatcherWebsocket
} from "./shared/functions/openEthWatcherWebsocket.ts";
