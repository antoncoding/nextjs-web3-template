import { SupportedNetworks } from './networks';

export const getMarketURL = (id: string, chainId: number): string => {
  const chain = chainId === 1 ? 'mainnet' : 'base';
  return `https://app.morpho.org/market?id=${id}&network=${chain}`;
};

export const getAssetURL = (address: string, chain: SupportedNetworks): string => {
  switch (chain) {
    case SupportedNetworks.Mainnet:
      return `https://etherscan.io/token/${address}`;
    case SupportedNetworks.Base:
      return `https://basescan.org/token/${address}`;
    case SupportedNetworks.Polygon:
      return `https://polygonscan.com/token/${address}`;
    case SupportedNetworks.Unichain:
      return `https://uniscan.xyz/token/${address}`;
  }
};

export const getExplorerURL = (address: string, chain: SupportedNetworks): string => {
  switch (chain) {
    case SupportedNetworks.Mainnet:
      return `https://etherscan.io/address/${address}`;
    case SupportedNetworks.Base:
      return `https://basescan.org/address/${address}`;
    case SupportedNetworks.Polygon:
      return `https://polygonscan.com/address/${address}`;
    case SupportedNetworks.Unichain:
      return `https://uniscan.xyz/address/${address}`;
  }
};

export const getExplorerTxURL = (hash: string, chain: SupportedNetworks): string => {
  switch (chain) {
    case SupportedNetworks.Mainnet:
      return `https://etherscan.io/tx/${hash}`;
    case SupportedNetworks.Base:
      return `https://basescan.org/tx/${hash}`;
    case SupportedNetworks.Polygon:
      return `https://polygonscan.com/tx/${hash}`;
    case SupportedNetworks.Unichain:
      return `https://uniscan.xyz/tx/${hash}`;
  }
};

