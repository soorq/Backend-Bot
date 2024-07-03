import { Action, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { UserFacade } from '@app/user/app-services';
import { Context, Scenes, Telegraf } from 'telegraf';
import { EnumRole } from '@app/entities/lib/enum';
import { keyboard } from './lib/keyboard';

type TContext = Scenes.SceneContext;

@Update()
export class BotUpdate {
  constructor(
    private readonly facadeUser: UserFacade,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: TContext) {
    const user = await this.facadeUser.queries.getOneUserByTg(
      ctx.message.from.id.toString(),
    );

    if (!user) {
      await ctx.reply(`Добро пожаловать, ${ctx.message.from.first_name}`, {
        reply_markup: keyboard.reply_markup,
      });
      return;
    }
  }

  @Action('RequestInvite')
  async getRequestInvite(@Ctx() ctx: TContext) {
    await ctx.answerCbQuery('Отправлено. Ожидайте ответа.', {
      show_alert: true,
    });
    const admins = await this.facadeUser.queries.getAllAdmins();

    const msgInviting = `Новый воркер: <a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`;

    admins.map(async (admin) => {
      await this.bot.telegram.sendMessage(admin.tg_id, msgInviting, {
        parse_mode: 'HTML',
      });
    });
  }
}
