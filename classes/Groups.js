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
            goalAgainst:0,
            ...customizedCountry
        }
        
    }

   playMatch(match){

        const homeGoals = this.generateGoals();
        const awayGoals = this.generateGoals();

        return{

            homeCountry:match[LOCAL_COUNTRY],
            homeGoals,
            awayCountry:match[AWAY_COUNTRY],
            awayGoals

        }

    }

    generateGoals(){

        return Math.round(Math.random()*10);

    }
    
    
    getTeamOfName(nameCountry){

        return this.groups.find(nameTeam => nameTeam.name == nameCountry);
    }
    updateCountry(resultMatch){
     
        const homeCountry = this.getTeamOfName(resultMatch.homeTeam);
        const awayCountry = this.getTeamOfName(resultMatch.awayTeam);
        
        homeCountry.goalsFor+=resultMatch.homeGoals;
        homeCountry.goalAgainst+=resultMatch.awayGoals;
        awayCountry.goalAgainst+=resultMatch.homeGoals;
        awayCountry.goalsFor+=resultMatch.awayGoals;


        if (resultMatch.homeGoals > resultMatch.awayGoals){
            homeCountry.points+=this.config.pointsWins;
            homeCountry.matchesWon+=1;
            awayCountry.points+=this.config.pointsLost;
            awayCountry.matchesLost+=1;

        }else if(resultMatch.homeGoals < resultMatch.awayGoals){
            awayCountry.points+=this.config.pointsWins;
            awayCountry.matchesWon+=1;
            homeCountry.points+=this.config.pointsLost;
            homeCountry.matchesLost+=1;

        }else{

            awayCountry.points+=this.config.pointsDraw;
            awayCountry.matchesDrawn+=1;
            homeCountry.points+=this.config.pointsDraw;
            homeCountry.matchesDrawn+=1;
        }

    }

    getLeagueStandings(){

        this.groups.sort(function(teamA,teamB){

            if (teamA.points>teamB.points){

                return -1;

            }else if (teamA.points<teamB.points){

                return 1;
            }else{

               const goalsDiffA=teamA.goalsFor - teamB.goalAgainst;
               const goalsDiffB=teamB.goalsFor - teamA.goalAgainst;

               if (goalsDiffA > goalsDiffB ) {
                   
                return -1;

               }else if(goalsDiffA < goalsDiffB ){

                return 1;

               }else{

                return 0;

               }


            }

        });
        /*console.log('standings');
        console.table(this.groups);*/
    }


    

}