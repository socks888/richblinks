// layout.tsx or _app.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";

// Import Solana wallet adapters and providers
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const network = clusterApiUrl("devnet"); // or "mainnet-beta"
  const wallets = [new PhantomWalletAdapter()];

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={network}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
