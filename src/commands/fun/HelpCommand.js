const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'fun', ['show commands']);
  }

  async run(client, message, args) {
    const CurrentCommands = {
        "Add Player": "Adds a player to the game, but not into initiative. Command: Yo SG, AddPlayer <Character Name> <Character HP> <Character AC> <Character Dex Bonus> IE: Yo SG, AddPlayer Quest 57 18 3",
        "Add To Initiative" : "Adds a player that is in game into initiative. Command: Yo SG, AddToInitiative <Character Name> <Initiative Roll> IE: Yo SG, AddToInitiative Quest 23",
        "Attack" : "Performs an attack and responds whether the attack hits, is dodged, or is blocked. Command: Yo SG, attack <Attacking Character> <Defending Character> <To Hit Bonus> IE: Yo SG, attack Quest Bob 15",
        "Damage" : "Applies damage to target. Command: Yo SG, damage <Target Character Name> <Damage> IE: Yo SG, damage Bob 20",
        "Display" : "Displays a character's card. Command: Yo SG, display <Character Name> IE: Yo SG, display Quest",
        "Help" : "Tells you the commands available to you. Yo SG, help",
        "Next Round" : "Goes to the next character in the combat. Command: Yo SG, next",
        "Remove From Initiative": "Removes a player from initiative. Command: Yo SG, RemoveFromInitiative <Character Name> IE: Yo SG, RemoveFromInitiative Quest"
    }
    message.channel.send("Here are the commands I currently know:")
    const Response = new Discord.MessageEmbed()
      Response.setColor("#0099ff");
      Response.setTitle("Commands");
      for(const [key, value] of Object.entries(CurrentCommands)){
        Response.addFields(
          {name: key, value: value}
        );
      }
    message.channel.send(Response)
  }
}