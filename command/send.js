const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("إرسال ملف محفوظ")
    .addStringOption(opt =>
      opt.setName("name").setDescription("اسم الملف").setRequired(true)
    ),

  async execute(interaction) {
    const name = interaction.options.getString("name");
    const filePath = path.join(__dirname, "..", "files", name);

    if (!fs.existsSync(filePath))
      return interaction.reply("❌ الملف غير موجود.");

    const file = new AttachmentBuilder(filePath);
    await interaction.reply({ content: "📤 تفضل:", files: [file] });
  }
};
