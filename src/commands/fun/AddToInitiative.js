const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class AddToInitiativeCommand extends BaseCommand {
    constructor() {
        super('AddToInitiative', 'fun', []);
    }


    async run(client, message, args) {
        if(args.length == 2 && isNaN(args[1]) == false){
            let CharacterToAdd = client.CheckForCharacter(args[0]);
            let FoundInInitiative = false;

            if(CharacterToAdd != false)
            {
                for(let i=0; i<client.initiative.length; i++){
                    if(CharacterToAdd == client.initiative[i][0]){
                        FoundInInitiative = true;
                    }
                }
                if(FoundInInitiative){
                    message.channel.send(`${CharacterToAdd.Name} is already in initiative!`);
                }
                else{
                    client.initiative.push([CharacterToAdd,args[1]]);
                    message.channel.send(`Added ${CharacterToAdd.Name} to initiative!`);
                    // Sorts character into initiative order
                    for(let i=client.initiative.length-1; i>0; i--){
                        if(Number(client.initiative[i][1]) > Number(client.initiative[i-1][1])){
                            [client.initiative[i],client.initiative[i-1]] = [client.initiative[i-1],client.initiative[i]];
                        }
                    }
                }
            }
            else{
                message.channel.send("This character doesn't exist yet!!");
            }
        }
        else{
            message.channel.send("Please input your query in the following format: CharacterName InitiativeRoll");
        }
    }
}