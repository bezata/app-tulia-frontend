import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/firebaseAdmin';

export async function POST(req: NextRequest) {
  const { address, points = 200, questName } = await req.json();

  if (!address) {
    return NextResponse.json(
      { message: 'Address is required' },
      { status: 400 }
    );
  }

  try {
    const userRef = db.collection('users').doc(address);
    const userDoc = await userRef.get();

    const currentTimestamp = Date.now();
    const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (userDoc.exists) {
      const userData = userDoc.data();
      if (!userData) {
        throw new Error('User data is undefined');
      }

      const updates: { [key: string]: any } = {};
      let questLastRewardTimestamp = 0;

      if (questName) {
        questLastRewardTimestamp =
          userData.quests?.[questName]?.lastRewardTimestamp ?? 0;
      }

      // Reset quests if last reward for the specific quest was more than 24 hours ago
      if (
        questName &&
        currentTimestamp - questLastRewardTimestamp >= ONE_DAY_MS
      ) {
        updates.quests = {
          ...(userData.quests ?? {}),
          [questName]: {
            completed: true,
            lastRewardTimestamp: currentTimestamp,
          },
        };
        updates.asteroidPoints = (userData.asteroidPoints ?? 0) + points;

        await userRef.update(updates);
        return NextResponse.json(
          {
            message: `${points} asteroid points added for quest '${questName}' and cooldown reset after 24 hours!`,
          },
          { status: 200 }
        );
      } else if (!questName) {
        // If no quest is specified, just update points
        updates.asteroidPoints = (userData.asteroidPoints ?? 0) + points;

        await userRef.update(updates);
        return NextResponse.json(
          {
            message: `${points} asteroid points added!`,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            message:
              'Quest is still in cooldown or already completed within the last 24 hours.',
          },
          { status: 400 }
        );
      }
    } else {
      // Create new user document if it doesn't exist
      const newUser = {
        asteroidPoints: points,
        quests: questName
          ? {
              [questName]: {
                completed: true,
                lastRewardTimestamp: currentTimestamp,
              },
            }
          : {},
        createdAt: new Date(),
        fromAmountUSD: '0',
      };

      await userRef.set(newUser);
      return NextResponse.json(
        {
          message: 'New user document created and asteroid points added!',
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error updating asteroid points:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
