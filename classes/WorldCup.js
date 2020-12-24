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
        this.drawGroups(countries);


    }

    drawGroups(countries){ //SORTEO 

        countries.shuffle(); // Desordenamos el array antes de comenzar el sorteo.
        let i=1;
        let countriesGroup = []; //Inicializo con let porque luego vacío el elemento
        console.log(countries);
      
        countries.forEach (country=>{

            countriesGroup.push(country); //AÑADIMOS LOS PAÍSES A CADA GRUPO
            if(i===4){ // 
                this.groups.push(countriesGroup); //VAMOS GENERANDO LOS GRUPOS
                countriesGroup=[]; //VACÍAMOS EL ARRAY AUXILIAR
                i=0;
            }
            i++;
        });

        console.log(this.groups);
        
        
       
        


    }

    customizeGroups(country){

        return{
            country,
            matchesWon:0,
            matchesDraw:0,
            matchesLost:0,
        }

    }
 
  

}