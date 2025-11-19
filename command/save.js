const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("save")
    .setDescription("حفظ ملف على السيرفر")
    .addAttachmentOption(opt =>
      opt.setName("file").setDescription("اختر الملف").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("name").setDescription("اسم الملف الذي تريده").setRequired(true)
    ),

  async execute(interaction) {
    const file = interaction.options.getAttachment("file");
    const name = interaction.options.getString("name");

    const folder = path.join(__dirname, "..", "files");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const filePath = path.join(folder, name);

    // تنزيل الملف
    const response = await fetch(file.url);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    await interaction.reply(`✅ **تم حفظ الملف باسم:** \`${name}\``);
  }
};
