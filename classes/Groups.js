import WorldCup from './WorldCup.js';

export default class Groups extends WorldCup{
    
    customizeGroups(nameCountry){

        const customizedCountry = super.customizeGroups(nameCountry);
        return{

            points:0,
            goalsFor:0,
            goalAgainst:0,
            ...customizedCountry
        }
        
    }
    

}