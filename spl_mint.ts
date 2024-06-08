import { Keypair, Connection, PublicKey } from "@solana/web3.js";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import wallet from "../wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); // Your wallet keypair
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const mintAddress = new PublicKey("6XDhKJNFLYBzkXxpwwZV1MNVu2jt9KgXtNndfJfvTzL4");
const mintAuthority = new PublicKey("BaXbrguQkAzMdHiV3E6GphrWvs9hj1cnSYRnEUghpJRV");

(async () => {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mintAddress,
        keypair.publicKey
    );

    const ata = tokenAccount.address;
    console.log("Associated Token Account:", ata.toBase58());

    const amount = 10e6;

    await mintTo(
        connection,
        keypair,
        mintAddress,
        ata,
        mintAuthority,
        amount
    );

    console.log("Minted", amount, "to", ata.toBase58());
})();
