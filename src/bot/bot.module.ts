import { telegrafInjectOptions } from '../../.configs/bot.config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';
import { Module } from '@nestjs/common';

@Module({
  imports: [TelegrafModule.forRootAsync(telegrafInjectOptions())],
  providers: [BotUpdate],
})
export class BotModule {}
