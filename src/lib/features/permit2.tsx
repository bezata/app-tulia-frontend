import React, { useMemo, useState } from 'react';
import { useSignTypedData, useChainId } from 'wagmi';

function BatchPermitComponent() {
  const { signTypedData } = useSignTypedData();
  const chainId = useChainId();
  const contractAddress = '0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2';

  const signEIP712 = async () => {
    try {
      signTypedData({
        domain: {
          name: 'Permit2',
          chainId: BigInt(chainId),
          verifyingContract: contractAddress,
        },
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          PermitBatch: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'sigDeadline', type: 'uint256' },
            { name: 'details', type: 'PermitDetail[]' },
          ],
          PermitSingle: [
            { name: 'details', type: 'PermitDetails' },
            { name: 'spender', type: 'address' },
            { name: 'sigDeadline', type: 'uint256' },
          ],
          PermitDetails: [
            { name: 'token', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'expiration', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
          ],
        },
        primaryType: 'PermitSingle',
        message: {
          details: {
            token: '0x9A53d5b4fd78e715d1d238464585179f3d8d7Fe0',
            amount: BigInt(100),
            expiration: BigInt(1700000000),
            nonce: BigInt(0),
          },
          spender: contractAddress,
          sigDeadline: BigInt(1700000000),
        },
      });
    } catch (error) {
      console.error('Error calculating signature:', error);
    }
  };

  return (
    <div>
      <button onClick={signEIP712}>PERMIT2</button>
    </div>
  );
}

export default BatchPermitComponent;
