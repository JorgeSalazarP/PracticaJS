Array.prototype.shuffle=function()
{

    var i = this.length;
    while(i){

        var j = Math.floor(Math.random()*i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;

    }
    return this;
}
export default class WorldCup{

    constructor (nameChampionShip,countries=[]){

        this.nameChampionShip=nameChampionShip;
        this.countries=[];
        this.groups=[];
        this.schedule=[];
        this.GroupsWorldCup(countries);
        this.scheduleGroup();
        this.getCountriesNameGroups();
      
    }

    GroupsWorldCup(nameCountries){ //Recibimos el nombre de los países participantes.

        nameCountries.shuffle(); // Desordenamos el array antes de configurar los grupos.
        let i=1;
        let countriesGroup = []; 
        nameCountries.forEach (nameCountry=>{

            const customizedCountry=this.customizeGroups(nameCountry); 
            countriesGroup.push(customizedCountry);//Los países ya tienen sus propiedades.
            if(i===4){ 
                this.groups.push(countriesGroup); //Vamos generando los grupos
                countriesGroup=[]; //vacíamos el array auxiliar.
                i=0;
            }
            i++;
        });
        
      
        
    }

    customizeGroups(nameCountry){

        return{
            nameCountry,
            matchesWon:0,
            matchesDraw:0,
            matchesLost:0,
           
        }

    }
    

    scheduleGroup(){

        const numMatchDays = this.groups[0].length-1; // De cualquier grupo cogemos su longitud
        const numMatchesGroups = this.groups[0].length/2
        for (let i=0;i<numMatchDays;i++){

            const matchDayGroup = [];
            for (let j=0;j<numMatchesGroups;j++){

                const match = ['',''];
                matchDayGroup.push(match);
            }

            this.schedule.push(matchDayGroup);

           
        }
        
    }
    getCountriesNameGroups(){ // con este método obtenemos los nombres de los países de cada grupo
        
        this.groups.forEach(group=>{
            const pais = [];
            group.forEach(name=>{

                pais.push(name.nameCountry);

            });
            // pasamos los países de cada grupo para configurar las jornadas
            // de cada grupo y los equipos
            this.setLocalGroups(pais); 
            this.setAwayGroups(pais); 
            this.setLastTeamGroups(pais); 
        });

    }
    setLocalGroups(namesCountriesPerGroup){

        const maxHomeTeams = this.groups[0].length-2;
        let teamIndex=0;
        this.schedule.forEach(matchDay =>{

            matchDay.forEach(match =>{

                match[0]= namesCountriesPerGroup[teamIndex];
                teamIndex++;

                if(teamIndex > maxHomeTeams){

                    teamIndex = 0;
                }
            });

        });
        
  
    }

    setAwayGroups(namesCountriesPerGroup){

        const maxAwayTeams = this.groups[0].length-2;
        let teamIndex= maxAwayTeams;
        this.schedule.forEach(matchDay =>{

            let isFirstMatch = true;
            matchDay.forEach(match =>{

                
                if(isFirstMatch){

                    isFirstMatch = false;
                }else{

                    match[1]= namesCountriesPerGroup[teamIndex];
                    teamIndex--;
    
                    if(teamIndex < 0){
    
                        teamIndex = maxAwayTeams;
                    }
                }
            });

        });
        
        
    }


    setLastTeamGroups(namesCountriesPerGroup){

        
        let maxDayNumber = 1;
        const lastTeamName = namesCountriesPerGroup[namesCountriesPerGroup.length-1];

        this.schedule.forEach(matchDay =>{

            const firstMatch = matchDay[0];

            if(maxDayNumber %2 == 0){

                firstMatch[1]=firstMatch[0];
                firstMatch[0]=lastTeamName;

            }else{

                firstMatch[1]= lastTeamName;
            }
            maxDayNumber++;
            
        });

        console.table(this.schedule);
        

    }
   
}