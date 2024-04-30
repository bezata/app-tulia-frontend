import React, { useEffect, useState, useMemo } from 'react';
import {
  useAccount,
  useSignTypedData,
  useWriteContract,
  useChainId,
} from 'wagmi';
import { PERMIT2ABI } from '@/lens/abi/Permit2';

function BatchPermitComponent() {
  const [signature, setSignature] = useState('');
  const { address } = useAccount();
  const { signTypedData } = useSignTypedData();
  const { writeContract } = useWriteContract();
  const chainId = useChainId();
  const contractAddress = '0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2';

  const types = useMemo(
    () => ({
      PermitBatch: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'sigDeadline', type: 'uint256' },
        { name: 'details', type: 'PermitDetails[]' },
      ],
      PermitDetails: [
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' },
        { name: 'expiration', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
      ],
    }),
    [chainId, contractAddress]
  );

  const permitBatchValue = useMemo(
    () => ({
      owner: address,
      spender: contractAddress,
      sigDeadline: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
      details: [
        {
          token: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E',
          amount: '100',
          expiration: '1700000000',
          nonce: '0',
        },
      ],
    }),
    [address, contractAddress]
  );

  const getDomain = () => ({
    name: 'Permit2',
    version: '1',
    chainId,
    verifyingContract: contractAddress,
  });

  const calculateSignature = () => {
    const sig = signTypedData({
      domain: {
        ...getDomain(),
        verifyingContract: contractAddress,
      },
      types,

      value: permitBatchValue,
    });
    setSignature(sig as any);
  };

  return (
    <div>
      <div>
        <button onClick={() => calculateSignature()}>Sign Data</button>
      </div>{' '}
      <button
        onClick={() =>
          writeContract({
            abi: PERMIT2ABI,
            address: contractAddress,
            functionName: 'permit',
            args: [permitBatchValue.owner, permitBatchValue.spender, signature],
          })
        }
      >
        Sign and Submit Permit
      </button>
    </div>
  );
}

export default BatchPermitComponent;
