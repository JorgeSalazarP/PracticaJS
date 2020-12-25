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
        

       console.log('Grupo',this.schedule);
       console.log('------------------------------------');

       
    }
    getCountriesNameGroups(){ // con este método obtenemos los nombres de los países de cada grupo
        
        this.groups.forEach(group=>{
            const pais = [];
            group.forEach(name=>{

                pais.push(name.nameCountry);

            });
            this.setLocalGroups(pais); // pasamos los países de cada grupo para configurar las jornadas
                                       // de cada grupo y los equipos

        });

    }
    setLocalGroups(namesCountriesPerGroup){


        
        
    }
   
}