const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class DamageCommand extends BaseCommand {
  constructor() {
    super('damage', 'fun', []);
  }

  async run(client, message, args) {
    if(args.length != 2 || isNaN(args[1])){
      message.channel.send('Please input attacks in the following format: <Target Name> <Damage Amount>');
    }
    else{
      let Defender;
      let DefenderFound = false;
      for(let i=0; i<client.combatants.length; i++){
        if(client.combatants[i].Name == args[0]){
          Defender = client.combatants[i];
          DefenderFound =  true;
        }
        if(DefenderFound == true){
          if(Number(Defender.HP) > 0){
              message.channel.send(`${Defender.Name} takes ${args[1]} damage.`);
              Defender.HP -= args[1];
              if(Defender.HP >0){
                message.channel.send(`${Defender.Name} has ${Defender.HP} HP left!`);
              }
              else if(Number(Defender.HP) > (0-Number(Defender.MaxHP))){
                Defender.HP = 0;
                Defender.IsConscious = false;
                message.channel.send(`${Defender.Name} has fallen unconscious!`);
              }
              else{
                Defender.IsConscious = false;
                Defender.IsAlive = false;
                message.channel.send(`That much damage kills ${Defender.Name} outright.`);
              }
          }
          else{
              console.log(`Damage taken: ${args[1]} Max HP:${Defender.MaxHP}`);
              if(Number(args[1]) >= Number(Defender.MaxHP)){
                Defender.IsAlive == false;
                message.channel.send(`${Defender.Name} takes the hit. ${Defender.Name} has died`);
              }
              else{
                message.channel.send(`${Defender.Name}'s unconscious body takes the hit.`);
              }
          }
        }
      }
    }
  }
}