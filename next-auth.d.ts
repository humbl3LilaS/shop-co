import NextAuth from 'next-auth';

// Extend the next-auth Session and JWT type interfaces
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        }
    }

    interface JWT {
        id: string;
    }
}