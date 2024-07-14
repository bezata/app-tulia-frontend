import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { address, fromAmountUSD } = await req.json();
    const currentTimestamp = Date.now();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const transactionAmount = parseFloat(fromAmountUSD);

    // Check if the address exists in the users collection
    const userRef = db.collection('users').doc(address);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData) {
        const lastTransactionTimestamp = userData.timestamp ?? 0;
        const transactionVolume = userData.transactionVolume ?? 0;
        const dailyTransactionVolume = userData.dailyTransactionVolume ?? 0;
        let newDailyTransactionVolume = transactionAmount;

        // Check if the last transaction was more than 24 hours ago
        if (currentTimestamp - lastTransactionTimestamp < ONE_DAY_MS) {
          newDailyTransactionVolume += dailyTransactionVolume;
        }

        // Calculate asteroid points multiplier based on daily transaction volume
        let multiplier = 1;
        if (newDailyTransactionVolume >= 1_000_000) {
          multiplier = 3;
        } else if (newDailyTransactionVolume >= 500_000) {
          multiplier = 2;
        } else if (newDailyTransactionVolume >= 100_000) {
          multiplier = 1.75;
        } else if (newDailyTransactionVolume >= 10_000) {
          multiplier = 1.5;
        } else if (newDailyTransactionVolume >= 50) {
          multiplier = 1.25;
        }

        // Calculate new asteroid points based on daily transaction volume
        let newAsteroidPoints = userData.asteroidPoints ?? 0;
        newAsteroidPoints += (transactionAmount / 50) * 100 * multiplier;

        await userRef.update({
          transactionVolume: transactionVolume + transactionAmount,
          dailyTransactionVolume: newDailyTransactionVolume,
          asteroidPoints: newAsteroidPoints,
          fromAmountUSD,
          timestamp: currentTimestamp,
        });
        return NextResponse.json(
          { message: 'User document updated successfully' },
          { status: 200 }
        );
      } else {
        throw new Error('User data is undefined');
      }
    } else {
      // Calculate initial asteroid points based on daily transaction volume
      let multiplier = 1;
      if (transactionAmount >= 1_000_000) {
        multiplier = 3;
      } else if (transactionAmount >= 500_000) {
        multiplier = 2;
      } else if (transactionAmount >= 100_000) {
        multiplier = 1.75;
      } else if (transactionAmount >= 10_000) {
        multiplier = 1.5;
      } else if (transactionAmount >= 50) {
        multiplier = 1.25;
      }
      const initialAsteroidPoints = (transactionAmount / 50) * 100 * multiplier;

      // Create a new user document
      await userRef.set({
        transactionVolume: transactionAmount,
        dailyTransactionVolume: transactionAmount,
        asteroidPoints: initialAsteroidPoints,
        fromAmountUSD,
        timestamp: currentTimestamp,
        createdAt: new Date(),
        last_reward: new Date(),
        quests: {},
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
