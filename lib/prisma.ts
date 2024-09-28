import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

// Declare a custom type for the global object
declare global {
  var prisma: ExtendedPrismaClient | undefined;
}

// Create a type that extends the PrismaClient with the Accelerate functionality
type ExtendedPrismaClient = PrismaClient & ReturnType<typeof withAccelerate>;

// Prevent multiple instances of Prisma Client in development
const prisma = global.prisma || (new PrismaClient().$extends(withAccelerate()) as unknown as ExtendedPrismaClient);

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
