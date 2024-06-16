// src/app/api/store-transaction/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { address, fromAmountUSD } = await req.json();

    // Check if the address exists in the users collection
    const userRef = db.collection('users').doc(address);
    const userDoc = await userRef.get();

    if (userDoc.exists && userDoc.data()) {
      const newTransactionVolume =
        (userDoc?.data()?.transactionVolume ?? 0) + parseFloat(fromAmountUSD);
      await userRef.update({
        transactionVolume: newTransactionVolume,
        fromAmountUSD,
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { message: 'User document updated successfully' },
        { status: 200 }
      );
    } else {
      // Create a new user document
      await userRef.set({
        transactionVolume: parseFloat(fromAmountUSD),
        fromAmountUSD,
        timestamp: Date.now(),
      });
      return NextResponse.json(
        { message: 'New user document created successfully' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error storing transaction:', error);
    return NextResponse.json(
      { message: 'Failed to store transaction' },
      { status: 500 }
    );
  }
}
