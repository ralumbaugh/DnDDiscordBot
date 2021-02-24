const BaseCommand = require('../../utils/structures/BaseCommand');


class Player {
  constructor(Name, HP, AC, Dex){
    this.Name = Name;
    this.HP = HP;
    this.MaxHP = HP;
    this.AC = AC;
    this.Dex = Dex;
    this.IsConscious = true;
    this.IsAlive = true;
    this.DeathSaves = 0;
    this.DodgeMessage = [
      `${this.Name} dodges out of the way just in the nick of time!`,
      `${this.Name} is just too fast!`
    ]
    this.BlockMessage = [
      `The hit connects, but ${this.Name}'s armor absorbs the impact.`,
      `${this.Name} parries the strike away, avoiding all damage.`
    ]
  }

  ShowStats(){
    return `${this.Name} has the following stats: HP=${this.HP}, Max HP=${this.MaxHP}, AC=${this.AC}, Dex bonus=${this.Dex}`;
  }
  
  // BeAttacked(toHit) {
  BeAttacked(toHit) {
    if(isNaN(toHit))
    {
      return `Please input a number for your to hit bonus.`
    }
    let DexDifference = this.AC - this.Dex;
    if(Number(toHit) >= Number(this.AC))
    {
      // Attacker hit defender
      return `${this.Name} got hit.`
    }
    else if(Number(toHit) >= Number(DexDifference))
    {
      // Defender only blocked due to combination of Dex + AC. Dex itself wasn't enough, therefor no dodge.
      return this.BlockMessage[Math.floor(Math.random() * this.BlockMessage.length)];
    }
    else
    {
      // Defender could have avoided with dexterity only.
      return this.DodgeMessage[Math.floor(Math.random() * this.DodgeMessage.length)];
    }
  }

  Attack(target, toHit) {
    return target.BeAttacked(toHit);
  }
}

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