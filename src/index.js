const { MessageEmbed, Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
client.messages = [];
client.combatants = [];
client.initiative = [];
client.initiativeCount = 0;
client.CheckForCharacter = (CharacterToCheck) => {
  for(let i=0; i<client.combatants.length; i++){
    if(client.combatants[i].Name == CharacterToCheck){
      return client.combatants[i];
    }
  }
  return false;
}
client.DisplayCharacter = (Character) => {
  const CharacterToDisplay = client.CheckForCharacter(Character);
  let response;
  if(CharacterToDisplay == false){
    response = `${Character} hasn't been added yet. Try the AddPlayer command!`;
  }
  else{
    const CharacterCard = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`${CharacterToDisplay.Name}`)
      .addFields(
        {name: "HP", value: `${CharacterToDisplay.HP}/${CharacterToDisplay.MaxHP}`},
        {name: "AC", value: `${CharacterToDisplay.AC}`}
      )
    response = CharacterCard;
  }
  return response;
}



(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();

