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
        this.groupsWorldCup(countries);
        this.summaries=[];
        this.scheduleRounds=[];
        
    }

    /**********CREAMOS LOS 8 GRUPOS CON SUS CALENDARIOS Y CUSTOMIZAMOS LOS PAÍSES**********/

    groupsWorldCup(nameCountries){ //Recibimos el nombre de los países participantes.

        nameCountries.shuffle(); // Desordenamos el array antes de configurar los grupos.
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

        this.schedulePerGroup.push(this.schedule); // LA MISMA ESTRUCTURA DE CALENDARIO PARA CADA GRUPO
        

        
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
            resultMatch = this.playMatch(matchDay[1][0],matchDay[1][1]);//juego el partido 2 de la jornada.
            this.updateCountry(resultMatch,numGroup);
            matchDaySummary.results.push(resultMatch);
            

            this.getLeagueStandings(numGroup);
            matchDaySummary.standings = this.groups[numGroup].map(team=> Object.assign({}, team));
            this.summaries.push(matchDaySummary);


        })
            
        
    }
    
    
    teamsQualifiedSexteen(){

        this.roundOfSexteen=[];
        this.groups.forEach((group)=>{

            group.forEach((name,index)=>{ // de cada grupo guardo los dos primeros clasificados.
        
                if(index===0 || index===1){
        
                    this.roundOfSexteen.push(name.nameCountry);
                
                }
            });
           
        });

    }
   
    initScheduleRoundSexteen(){ //ORGANIZAMOS EL ARRAY DE OCTAVOS DE FINAL.

        this.matchesPlayOff=[];
        let num=3;/*Necesitamos un tres para ordenar los partidos de una parte el cuadro y que no se encuentren los equipos de un mismo grupo hasta la final.*/
        for(let i=1;i>=0;i--){ // NECESITO RECORRER DOS VECES EL ARRAY DE OCTAVOS DE FINAL PARA ORDENAR LOS PARTIDOS.

            this.compositionRoundSexteen(i,num);
            num=1; //Ahora necesitamos un uno 
                
        }
        

    }
    

    compositionRoundSexteen(i,num){
        //Agrupamos los cruces, cuando i=1 1A-2B, 1C-2D, 1E-2F Y 1G-2H
        //Agrupamos los cruces, cuando i=0 1B-2A, 1D-2C, 1F-2E Y 1H-2G
        this.roundOfSexteen.forEach((country,index)=>{

            if(i===1){

                this.matchesPlayOff.push(country);
                this.matchesPlayOff.push(this.roundOfSexteen[index+num]);
            }
            if(i===4){

                i=0;
            }
            i++;

        });

        
    }


   


    teamsQualified(){

        this.matchesPlayOff=[];
        this.playedMatches.forEach(playedMatches=>{

            const qualifiedCountry = this.winnerTeam(playedMatches);
            this.matchesPlayOff.push(qualifiedCountry);
           
        });

    }
   
    setSchedulePlayOff(){ //  // REALIZAMOS LA ESTRUCTURA DEL CALENDARIO DE LOS CUARTOS DE FINAL
        this.scheduleRounds=[];
       
        let matches = [];
        let j=true;
        for(let i=0;i< this.matchesPlayOff.length;i++){ //Recorremos el array con los equipos clasificados.

            if(j){ // Necesitamos que una vez entre y otra no.
                 
                matches.push(this.matchesPlayOff.slice(i,i+2));
                this.scheduleRounds.push(matches);
                matches=[];
                j=false;
                
            }else{

                j=true;
            }

        } 
    
    }
    

   


    startRoundPlayOff(){

        this.playedMatches=[];
        this.scheduleRounds.forEach(matches=>{
            
            matches.forEach(team=>{

                let drawnMatch = false;
                let resultMatch = [];
                do{ // el partido se vuelve a jugar si empatan
                    resultMatch = this.playMatch(team[0],team[1]); 
                    drawnMatch = this.analizeResult(resultMatch);
               
                }while(drawnMatch);
                
                this.playedMatches.push(resultMatch);// GUARDAMOS LOS PARTIDOS SIN EMPATES.

            });
 
        });

    }

   
    matchThirdPlace(){

        this.matchesPlayOff = [];
        this.playedMatches.forEach(playedMatches=>{

            const qualifiedCountry = this.loseTeam(playedMatches);
            this.matchesPlayOff.push(qualifiedCountry);
        
        });
    }


   
    startFinals(){

        this.playedMatchesFinal=[];
        
        let drawnMatch = false;
        this.resultMatch = []; // De esta forma lo llamo desde playOff.js
        do{ // el partido se vuelve a jugar si empatan
            this.resultMatch = this.playMatch(this.matchesPlayOff[0],this.matchesPlayOff[1]); //SE JUEGA EL TERCER Y CUARTO PUESTO Y DESPUÉS LA FINAL
            drawnMatch = this.analizeResult(this.resultMatch);
            
        }while(drawnMatch);
        
        this.playedMatchesFinal = this.winnerTeam(this.resultMatch); // GUARDAMOS EL RESULTADO DEL PARTIDO SIN EMPATE.

     
     
    }

    roundOfSexteen(){ //OCTAVOS DE FINAL

        this.teamsQualifiedSexteen();
        this.initScheduleRoundSexteen();
        this.setSchedulePlayOff();
    
    }

    nextRound(){ //CUARTOS Y SEMIFINALES

        this.teamsQualified();
        this.setSchedulePlayOff();
    }

    roundThirdPlace(){ // TERCER Y CUARTO PUESTO
        this.matchThirdPlace();
        this.startFinals();
    }
    
    roundFinal(){ //FINAL
        this.teamsQualified();
        this.startFinals();
        
    }
   

    playMatch(match){

        throw new Error ('Play method not implemented');
    }
    updateCountry(resultMatch){

        throw new Error ('updateCountry method not implemented');
    }

    getLeagueStandings(numGroup){

        throw new Error ('getLeagueStandings method not implemented');

    }

    analizeResult(resultMatch){

        throw new Error ('analizeResult method not implemented');

    }


    winnerTeam(playedMatches){

        throw new Error ('winnerTeam method not implemented');
    }

    loseTeam(playedMatches){

        throw new Error ('loseTeam method not implemented');

    }

}