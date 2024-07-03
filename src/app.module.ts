import { DomainsModule } from './domain/domain.module';
import { ProvidersModule } from '@app/providers';
import { BotModule } from './bot/bot.module';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: true,
    }),
    ProvidersModule,
    DomainsModule,
    BotModule,
    SharedModule,
  ],
})
export class AppModule {}
