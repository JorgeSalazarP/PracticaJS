import {countriesWorldCup} from './countries.js';
import WorldCup from './classes/WorldCup.js';
import Groups from './classes/Groups.js';
const letterGroup =['A','B','C','D','E','F','G','H'];


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


//championShip.startWorldCup();




