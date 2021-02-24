module.exports = class Player {
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