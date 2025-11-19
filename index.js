const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { token, logChannel } = require("./config");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// تحميل الأوامر
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// تسجيل الأحداث
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);

    // إرسال لوق
    const channel = client.channels.cache.get(logChannel);
    if (channel) {
      channel.send(`➡️ **${interaction.user.tag}** استخدم الأمر: **/${interaction.commandName}**`);
    }

  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "حدث خطأ أثناء تنفيذ الأمر ❌", ephemeral: true });
  }
});

// جاهزية البوت
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channel = client.channels.cache.get(logChannel);
  if (channel) channel.send("✅ البوت بدأ العمل");
});

client.login(token);
