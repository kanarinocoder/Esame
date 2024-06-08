import { Keypair, Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "../wallet.json";

// Creiamo una nuova istanza di Keypair usando la chiave privata salvata
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Stabiliamo una connessione con il cluster di devnet di Solana
const connection = new Connection("https://api.devnet.solana.com", "finalized");

/**
 * Funzione per richiedere un airdrop di SOL.
 * @param to Indirizzo PublicKey del wallet destinatario.
 * @param lamports Quantità di lamports da inviare (1 SOL = 1_000_000_000 lamports).
 * @returns Promise che risolve al signature della transazione.
 */
async function requestAirdrop(to: PublicKey, lamports: number): Promise<string> {
    try {
        const airdropSignature = await connection.requestAirdrop(to, lamports);
        console.log(`Successo! Controlla la tua transazione qui: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
        return airdropSignature;
    } catch (error) {
        console.error('Errore durante la richiesta di airdrop:', error);
        throw error; // Rilancia l'errore per gestioni ulteriori se necessario
    }
}

// Avviamo la richiesta di airdrop asincronamente
(async () => {
    await requestAirdrop(keypair.publicKey, 1 * LAMPORTS_PER_SOL);
})();

/*
    Utilizza "yarn airdrop" per eseguire questo script, grazie allo script definito nel package.json.
    Attenzione a non effettuare troppe richieste di airdrop, per evitare limitazioni da parte del cluster di devnet di Solana.
    Se necessiti di più fondi, considera l'utilizzo della faucet di Solana: https://faucet.solana.com/
*/
