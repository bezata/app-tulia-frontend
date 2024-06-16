import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  SIWESession,
  verifySignature,
  getChainIdFromMessage,
  getAddressFromMessage,
} from '@web3modal/siwe';
import { db } from '../../../../configs/firebaseAdmin';

declare module 'next-auth' {
  interface Session extends SIWESession {
    address: string;
    chainId: number;
  }

  interface User {
    chainId: number;
    address: string;
  }
}

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (!nextAuthSecret) {
  throw new Error('NEXTAUTH_SECRET is not set');
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set');
}

const providers = [
  CredentialsProvider({
    name: 'Ethereum',
    credentials: {
      message: { label: 'Message', type: 'text', placeholder: '0x0' },
      signature: { label: 'Signature', type: 'text', placeholder: '0x0' },
    },
    async authorize(credentials) {
      try {
        if (!credentials?.message) {
          throw new Error('SiweMessage is undefined');
        }
        const { message, signature } = credentials;
        const address = getAddressFromMessage(message);
        const chainId = getChainIdFromMessage(message);

        const isValid = await verifySignature({
          address,
          message,
          signature,
          chainId,
          projectId,
        });

        if (isValid) {
          const userRef = db.collection('users').doc(address);
          const userDoc = await userRef.get();

          if (!userDoc.exists) {
            await userRef.set({ address, chainId }); // Create a new user if not existing
          }

          return {
            id: `${chainId}:${address}`,
            address,
            chainId: Number(chainId),
          };
        }

        return null;
      } catch (e) {
        return null;
      }
    },
  }),
];

const handler = NextAuth({
  secret: nextAuthSecret,
  providers,
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        const [chainId, address] = token.sub.split(':');
        if (chainId && address) {
          session.address = address;
          session.chainId = parseInt(chainId, 10);
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = `${user.chainId}:${user.address}`;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
