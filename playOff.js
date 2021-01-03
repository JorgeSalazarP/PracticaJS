import {championShip,showResults} from './index.js';


export default function playOff(){
    
    championShip.roundOfSexteen();/////////// OCTAVOS DE FINAL///////////////////////
    championShip.scheduleRoundOfSexteen.forEach(matches=>{
    
        matches.forEach(match=>{
            console.log(match.join(' vs '));
        });

    });

    championShip.startRoundOfSexteen();
    console.log('');
    championShip.playedMatchesRoundSexteen.forEach(result=>{

        showResults(result);
       
    });

   

    championShip.startRoundOfQuarterFinal();/////////// CUARTOS DE FINAL///////////////////////

    /*console.log('');
    championShip.playedMatchesRoundSexteen.forEach(result=>{

        showResults(result);
       
    })*/

}

