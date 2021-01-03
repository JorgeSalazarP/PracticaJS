import {championShip,showResults,showMatches} from './index.js';


export default function playOff(){
    
    /////////////////// OCTAVOS DE FINAL///////////////////////
    championShip.roundOfSexteen();
    championShip.scheduleRoundOfSexteen.forEach(matches=>{
    
        showMatches(matches);

    });

    championShip.startRoundOfSexteen();
    console.log('');
    championShip.playedMatchesRoundSexteen.forEach(result=>{

        showResults(result);
       
    });

   
    ////////////////// CUARTOS DE FINAL///////////////////////
    championShip.roundOfQuarterFinal();
    console.log('');
    championShip.scheduleRoundOfQuarter.forEach(matches=>{
    
        showMatches(matches);

    });

    championShip.startRoundOfQuarter();
    console.log('');
    championShip.playedMatchesRoundQuarter.forEach(result=>{

        showResults(result);
       
    });

    /////////////////// SEMIFINALES ///////////////////////
    championShip.roundSemiFinals();
    console.log('');
    championShip.scheduleRoundOfSemiFinals.forEach(matches=>{
    
        showMatches(matches);

    });

    championShip.startRoundOfSemiFinals();
    console.log('');
    championShip.playedMatchesRoundSemiFinals.forEach(result=>{

        showResults(result);
       
    });


     ///////////////////// FINAL /////////////////////////
     championShip.roundFinal();
     console.log('');
     console.log(`${championShip.roundFinal[0]} vs ${championShip.roundFinal[1]}`);
     console.log('');
     console.log(`¡${championShip.playedMatchFinal} campeón del mundo!`);
     
    


}

