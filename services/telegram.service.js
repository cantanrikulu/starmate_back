require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendBotMessage = async (message) => {
  try {
    await bot.telegram.sendMessage(CHAT_ID, message);
  } catch (error) {
    console.error("Telegram'a mesaj gönderilemedi:", error.message);
  }
};

bot.start((ctx) => {
  const myChatId = ctx.chat.id; // veya ctx.from.id
  console.log("Sizin Chat ID:", myChatId);
  ctx.reply("Merhaba! Chat ID’nizi konsola yazdım.");
});

bot.on("message", (ctx) => {
  console.log("Gelen mesaj:", ctx.message);
});

bot.launch().then(() => {
  console.log("🚀 Telegram botu aktif.");
});

module.exports = { bot, sendBotMessage };
