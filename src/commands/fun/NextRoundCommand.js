const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class NextCommand extends BaseCommand {
  constructor() {
    super('next', 'fun', ['next round']);
  }

  async run(client, message) {
    if(client.initiative.length == 0)
    {
      message.channel.send("Nobody's joined the fight yet. Feel free to add someone by saying 'Yo SG, AddPlayer <name> <HP> <AC> <Dex Bonus>' For example: Yo SG, AddPlayer Quest 57 18 3");
    }
    try {
      const InitiativeCard = new Discord.MessageEmbed()
      InitiativeCard.setColor("#0099ff");
      InitiativeCard.setTitle("Initiative");
      for(let i=client.initiativeCount; i<client.initiative.length; i++){
        InitiativeCard.addFields({name: client.initiative[i][0].Name, value: `HP: ${client.initiative[i][0].HP}/${client.initiative[i][0].MaxHP} AC: ${client.initiative[i][0].AC}`});
      }
      for(let i=0; i<client.initiativeCount; i++){
        InitiativeCard.addFields({name: client.initiative[i][0].Name, value: `HP: ${client.initiative[i][0].HP}/${client.initiative[i][0].MaxHP} AC: ${client.initiative[i][0].AC}`});
      }
      message.channel.send(InitiativeCard);
      if(client.initiativeCount == client.initiative.length-1){
        client.initiativeCount = 0;
      }
      else{
        client.initiativeCount++;
      }
    } catch (err) {
      console.log(err);
      message.channel.send("I can't do that dave");
    }
  }
}