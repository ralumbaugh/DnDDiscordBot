const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class DisplayCommand extends BaseCommand {
  constructor() {
    super('display', 'fun', ['display initiative']);
  }

  async run(client, message, args) {
    if(args.length != 1){
      message.channel.send("Please only input one characters name to display at once.");
    }
    else{
      let response = client.DisplayCharacter(args[0]);
      if(response == false){
        message.channel.send(`${Character} hasn't been added yet. Try the AddPlayer command!`);
      }
      else{
        message.channel.send(response);
      }
    }
  }
}