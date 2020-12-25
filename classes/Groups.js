import WorldCup from './WorldCup.js';

export default class Groups extends WorldCup{
    
    constructor (nameChampionShip,countries=[],config={}){

        super(nameChampionShip,countries);
        this.setupConfigGroups(config);
    }

    setupConfigGroups(config){

        const defaultConfigGroups = {
            rounds:1,
            pointsWin:3,
            pointsDraw:1,
            pointsLost:0
        }
        this.config=Object.assign(defaultConfigGroups,config);

        console.log(this.config);
    }
    customizeGroups(nameCountry){

        this.setupPointsGroups
        const customizedCountry = super.customizeGroups(nameCountry);
        return{

            points:0,
            goalsFor:0,
            goalAgainst:0,
            ...customizedCountry
        }
        
    }
    

}