'use client';

import { ReactNode, useMemo } from 'react';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, mainnet, polygon, unichain } from 'wagmi/chains';
import { createWagmiConfig } from '@/store/createWagmiConfig';
import { getChainsForEnvironment } from '@/store/supportedChains';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

// TODO Docs ~~~
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '';
if (!projectId) {
  const providerErrMessage =
    'To connect to all Wallets you need to provide a NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable';
  throw new Error(providerErrMessage);
}

function OnchainProviders({ children }: Props) {
  const wagmiConfig = useMemo(() => {
    // Create different configs for server vs client
    if (typeof window === 'undefined') {
      // Server-side: minimal config without WalletConnect to avoid indexedDB
      return createConfig({
        ssr: false,
        chains: getChainsForEnvironment(),
        transports: {
          [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
          [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
          [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
          [unichain.id]: http(`https://unichain-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
        },
        connectors: [], // No connectors on server-side
      });
    }
    // Client-side: full config with all connectors
    return createWagmiConfig(projectId);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme({
              accentColor: '#f45f2d',
              borderRadius: 'small',
            }),
            darkMode: darkTheme({
              accentColor: '#f45f2d',
              borderRadius: 'small',
            }),
          }}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default OnchainProviders;
