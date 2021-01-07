export const playOff = (championShip,showResults,showMatches)=>{
    
    const showRoundsFinal = ()=>{
        console.log('');
        console.log(`${championShip.matchesPlayOff[0]} vs ${championShip.matchesPlayOff[1]}`);      
        console.log('');  
        console.log('====== Resultado ======');
        console.log('');
        console.log(`${championShip.resultMatch.homeTeam} ${championShip.resultMatch.homeGoals} - ${championShip.resultMatch.awayTeam} ${championShip.resultMatch.awayGoals}`);
    }

    const matchesAndResultsPlayOff = ()=>{
        console.log('');
        championShip.scheduleRounds.forEach(matches=>{
    
            showMatches(matches);

        });
        console.log('');
        championShip.startRoundPlayOff();
        console.log('====== Resultados ======');
        console.log('');
        championShip.playedMatches.forEach(result=>{

            showResults(result);
       
        });
    }
    console.log("==================================================");
    console.log("====== COMIENZO DE LA FASE DE ELIMINATORIAS ======");
    console.log("==================================================");
    console.log('');
    
    /////////////////// OCTAVOS DE FINAL///////////////////////
    console.log("====== OCTAVOS DE FINAL ======");
    championShip.roundOfSexteen();
    matchesAndResultsPlayOff();
   
    ////////////////// CUARTOS DE FINAL///////////////////////
    console.log('');
    console.log("====== CUARTOS DE FINAL ======");
    championShip.nextRound();
    matchesAndResultsPlayOff();

    /////////////////// SEMIFINALES ///////////////////////
    console.log('');
    console.log("====== SEMIFINALES ======");
    championShip.nextRound();
    matchesAndResultsPlayOff();

     ///////////////////// TERCER Y CUARTO PUESTO /////////////////////////
    console.log('');
    console.log("====== TERCER Y CUARTO PUESTO ======");
    championShip.roundThirdPlace();
    showRoundsFinal();

    ///////////////////// FINAL /////////////////////////
    console.log('');
    console.log("====== FINAL ======");
    championShip.roundFinal();
    showRoundsFinal();
    console.log('');
    console.log(`¡${(championShip.playedMatchesFinal).toUpperCase()} campeón del mundo!`);
     
    


}

