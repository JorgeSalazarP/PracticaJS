import WorldCup from './WorldCup.js';
import {LOCAL_COUNTRY, AWAY_COUNTRY} from './WorldCup.js';


export default class Groups extends WorldCup{
    
    constructor (nameChampionShip,countries=[],config={}){

        super(nameChampionShip,countries);
        this.setupLeagueGroups(config);
    }

    setupLeagueGroups(config){

        const defaultConfigGroups = {
            rounds:1,
            pointsWin:3,
            pointsDraw:1,
            pointsLost:0
        }
        this.config=Object.assign(defaultConfigGroups,config);

       
    }
    customizeGroups(nameCountry){
        
        const customizedCountry = super.customizeGroups(nameCountry);
        return{

            points:0,
            goalsFor:0,
            goalsAgainst:0,
            ...customizedCountry
        }
        
    }

    generateGoals(){

        return Math.round(Math.random() * 10);
    }
    
    playMatch(matchLocal,matchAway){

        const homeGoals=this.generateGoals();
        const awayGoals=this.generateGoals();
        
        return{

            homeTeam:matchLocal,
            homeGoals,
            awayTeam:matchAway,
            awayGoals
        }

    }

    getCountryName(nameCountry,numGroup){

        return this.groups[numGroup].find(name=>name.nameCountry == nameCountry);
    }

    updateCountry(resultMatch,numGroup){
        
        const homeCountry = this.getCountryName(resultMatch.homeTeam,numGroup);
        const awayCountry = this.getCountryName(resultMatch.awayTeam,numGroup);
        
    
        homeCountry.goalsFor+=resultMatch.homeGoals;
        homeCountry.goalsAgainst+=resultMatch.awayGoals;
        awayCountry.goalsAgainst+=resultMatch.homeGoals;
        awayCountry.goalsFor+=resultMatch.awayGoals;

        

        if (resultMatch.homeGoals > resultMatch.awayGoals){
            homeCountry.points+=this.config.pointsWin;
            homeCountry.matchesWon+=1;
            awayCountry.points+=this.config.pointsLost;
            awayCountry.matchesLost+=1;
           

        }else if(resultMatch.homeGoals < resultMatch.awayGoals){
            awayCountry.points+=this.config.pointsWin;
            awayCountry.matchesWon+=1;
            homeCountry.points+=this.config.pointsLost;
            homeCountry.matchesLost+=1;
            

        }else{

            awayCountry.points+=this.config.pointsDraw;
            awayCountry.matchesDraw+=1;
            homeCountry.points+=this.config.pointsDraw;
            homeCountry.matchesDraw+=1;
            
        }

    }

    getLeagueStandings(numGroup){
        

        this.groups[numGroup].sort(function(teamA,teamB){
           
            if (teamA.points>teamB.points){

                return -1;

            }else if (teamA.points<teamB.points){

                return 1;
            }else{

               const goalsDiffA=teamA.goalsFor - teamB.goalsAgainst;
               const goalsDiffB=teamB.goalsFor - teamA.goalsAgainst;

               if (goalsDiffA > goalsDiffB ) {
                   
                return -1;

               }else if(goalsDiffA < goalsDiffB ){

                return 1;

               }else{

                return 0;

               }


            }

        });
       
    

    }

    analizeResult(resultMatch){ // Comprobamos si el partido ha quedado empate.

        if(resultMatch.homeGoals == resultMatch.awayGoals){

            return true;
        }

    }
    

    winnerTeam(resultMatch){ // Capturamos al equipo ganador de los partidos.
        
        if(resultMatch.homeGoals > resultMatch.awayGoals){

            return resultMatch.homeTeam;

        }else{

            return resultMatch.awayTeam;
        }
       

    }

    loseTeam(resultMatch){ // Capturamos los equipos perdedores para el partido por el tercer y cuarto puesto.
        
        if(resultMatch.homeGoals > resultMatch.awayGoals){

            return resultMatch.awayTeam;

        }else{

            return resultMatch.homeTeam;
        }
       

    }


}