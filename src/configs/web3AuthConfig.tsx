// 'use client';
// import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
// import { Web3Auth } from '@web3auth/modal';
// import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
// import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from '@web3auth/base';
// import { Chain } from 'wagmi/chains';

// export default function Web3AuthConnectorInstance(chains: Chain[]) {
//   const name = 'Tulia';
//   const chainConfig = {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: '0x' + chains[0].id.toString(16),
//     rpcTarget: chains[0].rpcUrls.default.http[0],
//     displayName: chains[0].name,
//     tickerName: chains[0].nativeCurrency?.name,
//     ticker: chains[0].nativeCurrency?.symbol,
//     blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
//   };

//   const privateKeyProvider = new EthereumPrivateKeyProvider({
//     config: { chainConfig },
//   });

//   const web3AuthInstance = new Web3Auth({
//     clientId:
//       'BPhgkdnKRQUtqCE_QlWCyJah-alA-qFlqWIXrfoHsfuzFhgGtUOLp-rPdzpXg7GDVqPpzk_QnWaKWT1LlXDEZtw',
//     chainConfig,
//     privateKeyProvider,
//     uiConfig: {
//       appName: name,
//       loginMethodsOrder: ['google'],
//       defaultLanguage: 'en',
//       modalZIndex: '2147483647',
//       logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
//       logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
//       uxMode: 'redirect',
//       mode: 'light',
//     },
//     web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
//     enableLogging: true,
//   });

//   return Web3AuthConnector({
//     //@ts-ignore
//     web3AuthInstance,
//   });
// }
