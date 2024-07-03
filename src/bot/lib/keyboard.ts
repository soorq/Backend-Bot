import { Markup } from 'telegraf';

export const keyboard = Markup.inlineKeyboard([
  Markup.button.callback('Подать заявку', 'RequestInvite'),
]);
