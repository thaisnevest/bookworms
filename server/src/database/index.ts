import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV !== 'production' ? ['warn', 'error'] : [],
  errorFormat: process.env.NODE_ENV !== 'production' ? 'pretty' : 'colorless',
});

prisma
  .$connect()
  .then(() => {
    if (
      process.env.DATABASE_URL !==
      'postgres://postgres:docker@localhost:5433/bookworms-test'
    )
      console.log('📦 Successfully connected with database');
  })
  .catch((error: Error) => {
    console.log('❌ Error connecting to database', error.message);
  });

export default prisma;
