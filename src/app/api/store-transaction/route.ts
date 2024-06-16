// src/app/api/store-transaction/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { address, chainId, fromAmountUSD, toAmountUSD, status } =
      await req.json();

    const transactionRef = db.collection('transactions').doc();
    await transactionRef.set({
      address,
      chainId,
      fromAmountUSD,
      toAmountUSD,
      status,
      timestamp: Date.now(),
    });

    return NextResponse.json(
      { message: 'Transaction stored successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error storing transaction:', error);
    return NextResponse.json(
      { message: 'Failed to store transaction' },
      { status: 500 }
    );
  }
}
