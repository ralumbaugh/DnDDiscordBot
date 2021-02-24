const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RemoveFromInitiativeCommand extends BaseCommand {
    constructor() {
        super('RemoveFromInitiative', 'fun', []);
    }


    async run(client, message, args) {
        if(args.length == 1){
            let CharacterToAdd = client.CheckForCharacter(args[0]);
            let FoundInInitiative = false;

            if(CharacterToAdd != false)
            {
                for(let i=0; i<client.initiative.length; i++){
                    if(CharacterToAdd == client.initiative[i][0]){
                        client.initiative.splice(i, 1);
                        FoundInInitiative = true;
                    }
                }
                if(FoundInInitiative == true){
                    message.channel.send(`${CharacterToAdd.Name} has been removed from initiative!`);
                }
                else{
                    message.channel.send(`${CharacterToAdd.Name} isn't in initiative. You can't remove them!`);
                }
            }
            else{
                message.channel.send("This character doesn't exist yet!!");
            }
        }
        else{
            message.channel.send("Please input your query in the following format: CharacterName");
        }
    }
}