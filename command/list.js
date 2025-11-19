const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("عرض قائمة الملفات المحفوظة"),

  async execute(interaction) {
    const folder = path.join(__dirname, "..", "files");
    if (!fs.existsSync(folder)) return interaction.reply("📂 لا يوجد ملفات محفوظة.");

    const files = fs.readdirSync(folder);

    if (files.length === 0) return interaction.reply("📂 لا يوجد أي ملفات بعد.");

    await interaction.reply("📁 **الملفات:**\n" + files.map(f => `• ${f}`).join("\n"));
  }
};
