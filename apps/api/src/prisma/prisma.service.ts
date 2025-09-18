import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const isTestEnv =
      process.env.NODE_ENV === 'test' || !!process.env.JEST_WORKER_ID;
    const defaultUrl = isTestEnv ? 'file:./test.db' : 'file:./dev.db';
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL ?? defaultUrl,
        },
      },
    });
  }
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  // Optional: enable shutdown hooks when app closes
  async enableShutdownHooks(app: INestApplication): Promise<void> {
    (
      this as unknown as {
        $on: (event: string, cb: () => Promise<void>) => void;
      }
    ).$on('beforeExit', async () => {
      await app.close();
    });
  }
}
