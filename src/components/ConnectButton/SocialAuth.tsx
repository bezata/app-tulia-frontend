// import { useAccount, useConnect } from 'wagmi';
// import { Button } from '@/components/ui/button';
// export default function SocialAuth() {
//   const { isConnected } = useAccount();
//   const { connect, connectors } = useConnect();

//   const web3AuthConnector = connectors.find(
//     connector => connector.id === 'web3auth'
//   );

//   return (
//     <div>
//       {!isConnected && (
//         <Button
//           variant={'outline'}
//           className="hover:bg-violet-500/30"
//           type="button"
//           onClick={() =>
//             web3AuthConnector && connect({ connector: web3AuthConnector })
//           }
//         >
//           Connect with Google
//         </Button>
//       )}
//     </div>
//   );
// }
