import {countriesWorldCup} from './countries.js';
import WorldCup from './classes/WorldCup.js';
import Groups from './classes/Groups.js';
import playOff from './playOff.js';

const letterGroup =['A','B','C','D','E','F','G','H'];

export const championShip = new Groups('World Cup Spain 2021',countriesWorldCup);



championShip.groups.forEach((group,index)=>{
    console.log(`GRUPO ${letterGroup[index]}`);
    console.log('------------');
    group.forEach(countries=>{
       console.log(countries.nameCountry);
    });
    
    showMatchesGroup(index);

});



function showMatchesGroup(index){

    let i=0;
    championShip.schedulePerGroup[index].forEach(matchDay=>{
        console.log('');
        console.log(`Jornada ${i+1}`);

        matchDay.forEach(match=>{

            console.log(match.join(' vs '));
        });

        i++;
    });
    console.log('');
  
   
}

championShip.startLeagueWorldCup();// COMIENZA EL CAMPEONATO

//MOSTRAMOS LOS RESULTADOS POR JORNADAS Y GRUPOS.
for(let i=0;i<championShip.groups[0].length-1;i++){ //COGEMOS LA LONGITUD DE CUALQUIER GRUPO.

    resultsPerGroup(i,i+1); // i+1 es la jornada. //i es el contador para comparar con el índice del array de arrays de resultados.
}


function resultsPerGroup(i,day){

    let numGroup=0;
    championShip.summaries.forEach((summary,index)=>{

        if(index === i){
    
            showResultPerDayStandings(day,numGroup,summary.results); 
           
            console.table(summary.standings.map(teamCountry => {
                return {
                    Country: teamCountry.nameCountry,
                    Points: teamCountry.points,
                    PlayedMatches: teamCountry.matchesWon + teamCountry.matchesDraw + teamCountry.matchesLost,
                    Won: teamCountry.matchesWon,
                    Drawn: teamCountry.matchesDraw,
                    Lost: teamCountry.matchesLost,
                    GoalsFor: teamCountry.goalsFor,
                    GoalsAgainst: teamCountry.goalsAgainst,
                    GoalsDiff: teamCountry.goalsFor - teamCountry.goalsAgainst
                }
            }));
            numGroup++;
            i+=3;
    
        }
    
    });

}

function showResultPerDayStandings(scheduleDay,numGroup,summaryPerGroup){

    console.log(`GRUPO ${letterGroup[numGroup]}`);
    console.log('------------');
    console.log(`Resumen Jornada ${scheduleDay}`);
    summaryPerGroup.forEach(result=>{

        showResults(result);

    });
    console.log(' ');
   
}
playOff();


export function showResults(result){

    console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayTeam} ${result.awayGoals}`);
}






