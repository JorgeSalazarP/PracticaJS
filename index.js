import {countriesWorldCup} from './countries.js';
import WorldCup from './classes/WorldCup.js';
import Groups from './classes/Groups.js';
import {playOff} from './playOff.js';

const letterGroup =['A','B','C','D','E','F','G','H'];

const championShip = new Groups('COPA DEL MUNDO ESPAÑA 2021',countriesWorldCup);


const showResults = (result)=>{

    console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayTeam} ${result.awayGoals}`);
}

const showMatches = (matches)=>{

    matches.forEach(match=>{

        console.log(match.join(' vs '));
    });
}

const showMatchesGroup = (index) =>{

    let i=0;
    championShip.schedulePerGroup[index].forEach(matchDay=>{
        console.log('');
        console.log(`Jornada ${i+1}`);
        
        showMatches(matchDay);
        i++;
    });
    console.log('');
  
}



const resultsPerGroup = (i,day)=>{

    let numGroup=0;
    championShip.summaries.forEach((summary,index)=>{

        if(index === i){
    
            showResultPerDayStandings(day,numGroup,summary.results); 
           
            console.table(summary.standings.map(teamCountry => {
                return {
                    Equipo: teamCountry.nameCountry,
                    Puntos: teamCountry.points,
                    'Goles a favor': teamCountry.goalsFor,
                    'Goles en contra': teamCountry.goalsAgainst,
                    'Diferencia goles': teamCountry.goalsFor - teamCountry.goalsAgainst
                }
            }));
            numGroup++;
            i+=3;
    
        }
    
    });

}

const showResultPerDayStandings = (scheduleDay,numGroup,summaryPerGroup)=>{

    console.log(`GRUPO ${letterGroup[numGroup]}`);
    console.log('------------');
    console.log(`Resumen Jornada ${scheduleDay}`);
    console.log('');
    summaryPerGroup.forEach(result=>{

        showResults(result);

    });
    console.log(' ');
   
}

console.log(' ');
console.log('Grupos y equipos');
console.log('================');
console.log(' ');

championShip.groups.forEach((group,index)=>{
    console.log(`GRUPO ${letterGroup[index]}`);
    console.log('------------');
    group.forEach(countries=>{
       console.log(countries.nameCountry);
    });
    
    showMatchesGroup(index);

});



console.log("==================================================");
console.log(`======COMIENZA LA ${championShip.nameChampionShip}======`);
console.log("==================================================");
console.log('');
championShip.startLeagueWorldCup();// COMIENZA EL CAMPEONATO

//MOSTRAMOS LOS RESULTADOS POR JORNADAS Y GRUPOS.
for(let i=0;i<championShip.groups[0].length-1;i++){ //COGEMOS LA LONGITUD DE CUALQUIER GRUPO.

    resultsPerGroup(i,i+1); // i+1 es la jornada. //i es el contador para comparar con el índice del array de arrays de resultados.
}




playOff(championShip,showResults,showMatches);






