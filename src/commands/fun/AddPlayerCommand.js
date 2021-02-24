const BaseCommand = require('../../utils/structures/BaseCommand');
const Player = require('../../classes/PlayerClass');

module.exports = class AddPlayerCommand extends BaseCommand {
  constructor() {
    super('AddPlayer', 'fun', []);
  }

  run(client, message, args) {
    if(args.length == 4){
      const playerToAdd = new Player(args[0], args[1], args[2], args[3]);
      if(client.combatants.length == 0)
      {
        client.combatants.push(playerToAdd);
        message.channel.send(`Let's get this started! ${playerToAdd.Name} was added to the roster!`);
        message.channel.send(playerToAdd.ShowStats());
      }
      else
      {
        let isCreated = false;
        for(let i=0; i<client.combatants.length; i++)
        {
          if(client.combatants[i].Name == playerToAdd.Name){
            isCreated = true;
          }
        }
        if( isCreated == true){
          message.channel.send(`${playerToAdd.Name} is aleady added in the fight. Please either try a more descriptive name.`);
        }
        else{
          client.combatants.push(playerToAdd);
          message.channel.send(`${playerToAdd.Name} was added to the roster!`);
          message.channel.send(playerToAdd.ShowStats());
        }
      }
    }
    else{
      message.channel.send('That\'s not a proper input for this argument. Please input a name, an HP, an AC, and a dex bonus.');
    }
  }
}