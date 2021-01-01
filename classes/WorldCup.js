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

export const LOCAL_COUNTRY = 0;
export const AWAY_COUNTRY = 1;







export default class WorldCup{

    constructor (nameChampionShip,countries=[]){

        this.nameChampionShip=nameChampionShip;
        this.groups=[];
        this.schedule=[];
        this.schedulePerGroup=[];
        this.GroupsWorldCup(countries);
        
        this.summaries=[];
        
        
    }

    /**********CREAMOS LOS 8 GRUPOS CON SUS CALENDARIOS Y CUSTOMIZAMOS LOS PAÍSES**********/

    GroupsWorldCup(nameCountries){ //Recibimos el nombre de los países participantes.

        //nameCountries.shuffle(); // Desordenamos el array antes de configurar los grupos.
        let i=1;
        let group = []; 
        let nameCountryOfGroup = [];
        nameCountries.forEach (nameCountry=>{

            nameCountryOfGroup.push(nameCountry); //Capturamos el nombre de los países de cada grupo
            const customizedCountry=this.customizeGroups(nameCountry); //Customizamos cada nombre
            group.push(customizedCountry);//Los países ya tienen sus propiedades.

            if(i===4){ 

                this.groups.push(group); //Vamos generando los grupos, con los países customizados
                this.setSchedule();
                this.initCompositionMatches(nameCountryOfGroup);//solo mandamos los nombres para realizar el calendario.

                i=0;
                group=[];
                nameCountryOfGroup=[];
                
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
    
    setSchedule(){ // REALIZAMOS LA ESTRUCTURA DEL CALENDARIO DE LOS GRUPOS.
       
        const numMatchDays = this.groups[0].length-1; // De cualquier grupo cogemos su longitud
        const numMatchesGroups = this.groups[0].length/2;

        for (let i=0;i<numMatchDays;i++){

            const matchDayGroup = [];
            for (let j=0;j<numMatchesGroups;j++){
        
                const match = ['',''];
                matchDayGroup.push(match);
            }
        
            this.schedule.push(matchDayGroup);

            
        }

        this.schedulePerGroup.push(this.schedule); // UN MISMO CALENDARIO PARA GRUPO
        

        
    }
    
    //ORGANIZAMOS LOS PARTIDOS POR GRUPO.
    initCompositionMatches(namesCountriesGroup){

        this.scheduleLocalCountries(namesCountriesGroup);
        this.scheduleAwayCountries(namesCountriesGroup);
        this.scheduleLastCountries(namesCountriesGroup);
        this.schedule=[]; //Y OTRA VEZ VACÍAMOS EL CALENDARIO PARA RELLENAR OTRO GRUPO.
        

    }

    scheduleLocalCountries(namesCountriesGroup){
        
        
        const maxHomeTeams = namesCountriesGroup.length-2;
        
        let teamIndex=0;

           this.schedule.forEach(matchDay =>{
            matchDay.forEach(match =>{
                match[LOCAL_COUNTRY]= namesCountriesGroup[teamIndex];
                teamIndex++;

                if(teamIndex > maxHomeTeams){

                    teamIndex = 0;
                }
            });
        });

    
        
    }

    scheduleAwayCountries(namesCountriesGroup){

        const maxAwayTeams = namesCountriesGroup.length-2;
        let teamIndex= maxAwayTeams;
        this.schedule.forEach(matchDay =>{
            let isFirstMatch = true;
            matchDay.forEach(match =>{

                if(isFirstMatch){

                    isFirstMatch = false;
                }else{

                    match[AWAY_COUNTRY]= namesCountriesGroup[teamIndex];
                    teamIndex--;
    
                    if(teamIndex < 0){
    
                        teamIndex = maxAwayTeams;
                    }
                }
            });

        });
        
      
        
    }


    scheduleLastCountries(namesCountriesGroup){
     
        let maxDayNumber = 1;
        const lastTeamName = namesCountriesGroup[namesCountriesGroup.length-1];

        this.schedule.forEach(matchDay =>{

            const firstMatch = matchDay[LOCAL_COUNTRY];

            if(maxDayNumber %2 == 0){

                firstMatch[AWAY_COUNTRY]=firstMatch[LOCAL_COUNTRY];
                firstMatch[LOCAL_COUNTRY]=lastTeamName;

            }else{

                firstMatch[AWAY_COUNTRY]= lastTeamName;
            }
            maxDayNumber++;
            
            
        });
        
        
        
    } 
    startLeagueWorldCup(){
        
       this.groups.forEach((group,index)=>{

            this.matchesPerDay(index); // PARA CADA GRUPO           

        });
        
    }

    
    matchesPerDay(numGroup){
      
        
        this.schedulePerGroup[numGroup].forEach(matchDay =>{

            const matchDaySummary = {

                results:[],
                standings:null,

            }
            /*Capturamos los dos partidos de cada jornada*/    
            let resultMatch = this.playMatch(matchDay[0][0],matchDay[0][1]);//juego el partido 1 de la jornada.
            this.updateCountry(resultMatch,numGroup);
            matchDaySummary.results.push(resultMatch);
            resultMatch = this.playMatch(matchDay[1][0],matchDay[1][1]);//juego el partido 2 de la segunda jornada.
            this.updateCountry(resultMatch,numGroup);
            matchDaySummary.results.push(resultMatch);
            

            this.getLeagueStandings(numGroup);
            matchDaySummary.standings = this.groups[numGroup].map(team=> Object.assign({}, team));
            this.summaries.push(matchDaySummary);


        })
            
       
      
        

    }
    

   
    playMatch(match){

        throw new Error ('Play method not implemented');
    }
    updateCountry(resultMatch){

        throw new Error ('updateCountry method not implemented');
    }

    getLeagueStandings(){

        throw new Error ('getLeagueStandings method not implemented');

    }
}