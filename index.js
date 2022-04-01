const fs = require('fs');
const chalk = require('chalk')
const { Client, Collection, MessageEmbed, Intents } = require('discord.js');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: Object.keys(Discord.Intents.FLAGS).filter(x => ![].includes(x)).map(x => Discord.Intents.FLAGS[x]) });

client.cmds = new Collection();
var commandsData = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (var file of commandFiles) {
    var command = require(`./commands/${file}`);
    client.cmds.set(file.split(".")[0], command);
    commandsData.push(command.data.toJSON());
}

client.once('ready', async () => {
    console.log(`${chalk.red.bold(`[GetResources]`)} ${chalk.greenBright(`${client.user.tag} has connected to discord`)}`);
    client.user.setActivity(`getresources.info`, { type: 'WATCHING' });
    
    (async () => {
        try {
            console.log(`${chalk.red.bold(`[GetResources]`)} ${chalk.yellowBright(`Starting to load slash commands`)}`);
            
            try {
                if(config.startup.devInstance == false){
                    client.guilds.cache.forEach((guild) => {
                        guild.commands.set(commandsData);
                    })
                    console.log(`${chalk.red.bold(`[GetResources]`)} ${chalk.greenBright(`Slash commands loaded (globally)`)}`);
                }else if(config.startup.devInstance == true){
                    var devGuild = client.guilds.cache.get(config.developmentInstance.guildId)
                    devGuild.commands.set(commandsData);
                }
                console.log(`${chalk.red.bold(`[GetResources]`)} ${chalk.greenBright(`Slash commands loaded (dev mode)`)}`);
            } catch (error){
                console.log(error)
                console.log(`${chalk.red.bold(`[GetResources]`)} ${chalk.greenBright(`Error when registering commands`)}`)
                return
            }

            
    
            
        } catch (error) {
            console.error(error);
        }
    })();
});



client.on('guildMemberAdd', async (member) => {
    if(member.guild.id !== '959499850007851058') {
        return
       }else {
        const WelcomeEmbed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`New Member`)
        .setDescription(`${member} has joined GetResources\nMake sure to check us out at https://getresources.info`)
        .setTimestamp(Date.now())
        client.channels.cache.get('959499850007851062').send({embeds: [WelcomeEmbed]});
       }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    

    const command = client.cmds.get(interaction.commandName);

    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: `We found an error in the code here...`, ephemeral: true });
    }
});

try {
    if(config.startup.devInstance == false){
        client.login(config.productionInstace.token);  
    }else if(config.startup.devInstance == true){
    client.login(config.developmentInstance.token);   
    }
} catch (error){
    console.log(error)
    console.log(`${chalk.red.bold(`[GetResources]`)} ${chalk.greenBright(` Error starting the bot`)}`)
    
}