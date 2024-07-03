import { ConfigService } from "@nestjs/config";
import { TelegrafModuleAsyncOptions, TelegrafModuleOptions } from "nestjs-telegraf";

const telegrafModuleOptions = (config: ConfigService): TelegrafModuleOptions => {
  const apikey = config.get("TELEGRAM_API");

  if (!apikey) throw new Error(`Обязательное поле - |TELEGRAM_API|:${apikey}`);

  return {
    token: apikey
  };
};

export const telegrafInjectOptions = (): TelegrafModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => telegrafModuleOptions(config)
  };
};