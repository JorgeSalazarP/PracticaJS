import {countriesWorldCup} from './countries.js';
import WorldCup from './classes/WorldCup.js';
import Groups from './classes/Groups.js';

export const letterGroup =['A','B','C','D','E','F','G','H'];

const championShip = new Groups('World Cup Spain 2021',countriesWorldCup);


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

    resultsPerGroup(i,i+1); // i+1 es la jornada. 
                            //i es mi contador para comparar con el índice del array de arrays de resultados.

}


function resultsPerGroup(i,day){

    let numGroup=0;
    championShip.summaries.forEach((summary,index)=>{

        if(index === i){
    
            showResultPerDayStandings(day,numGroup,summary.results); 
            console.table(summary.standings);
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

        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayTeam} ${result.awayGoals}`);

    });
    console.log(' ');
   
}




// MOSTRAMOS LOS RESULTADOS DE LA JORNADA 1 DE CADA GRUPO
/*let numGroup=0;

championShip.summaries.forEach((summary,index)=>{

    if(index %3==0){
        
        showResultPerDayStandings('1',numGroup,summary.results);
        console.table(summary.standings);
        numGroup++;
    }
   
});


*/





/*

// MOSTRAMOS LOS RESULTADOS DE LA JORNADA 2 DE CADA GRUPO
let i=1;
numGroup=0;

championShip.summaries.forEach((summary,index)=>{

    if(index === i){

        showResultPerDayStandings('2',numGroup,summary.results);
        console.table(summary.standings);
        numGroup++;
        i+=3;

    }

});

*/
/*
i=2;
numGroup=0;
championShip.summaries.forEach((summary,index)=>{

    if(index === i){

        showResultPerDayStandings('3',numGroup,summary.results);
        console.table(summary.standings);
        numGroup++;
        i+=3;
    
    }

});
*/



