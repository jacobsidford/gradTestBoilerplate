import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // demo users
  const recruiter = await prisma.user.upsert({
    where: { email: 'user1@lawcyborg.com' },
    update: {},
    create: {
      name: 'user1',
      email: 'user1@lawcyborg.com',
      role: 'USER',
    },
  });
  const manager = await prisma.user.upsert({
    where: { email: 'user2@lawcyborg.com' },
    update: {},
    create: {
      name: 'user2',
      email: 'user2@lawcyborg.com',
      role: 'USER',
    },
  });
  const interviewer = await prisma.user.upsert({
    where: { email: 'interviewer@example.com' },
    update: {},
    create: {
      name: 'support',
      email: 'support@lawcyborg.com',
      role: 'SUPPORT',
    },
  });

  console.log('Seed complete', { recruiter, manager, interviewer });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
