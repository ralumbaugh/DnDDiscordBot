const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AttackCommand extends BaseCommand {
  constructor() {
    super('attack', 'fun', []);
  }

  async run(client, message, args) {
    if(args.length != 3 || isNaN(args[2]))
    {
      message.channel.send('Please input attacks in the following format: Attackername Targetname Tohit');
    }
    else{
      let Attacker;
      let AttackerFound = false;
      let Defender;
      let DefenderFound = false;
      for(let i=0; i<client.combatants.length; i++){
        if(client.combatants[i].Name == args[0]){
          Attacker = client.combatants[i];
          AttackerFound = true;
        }
        else if(client.combatants[i].Name === args [1]){
          Defender = client.combatants[i];
          DefenderFound =  true;
        }
        if(AttackerFound == true && DefenderFound == true){
          message.channel.send(`${Attacker.Name} swings at ${Defender.Name}...`);
          let MessageToSend = Attacker.Attack(Defender, args[2]);
          message.channel.send(MessageToSend);
        }
      }
    }
  }
}