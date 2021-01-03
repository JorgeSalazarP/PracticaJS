import {championShip} from './index.js';


export default function playOff(){
    
    championShip.roundOfSexteen();// OCTAVOS DE FINAL
    championShip.scheduleRoundOfSexteen.forEach(matches=>{
    
        matches.forEach(match=>{
            console.log(match.join(' vs '));
        });

    });

    championShip.startRoundOfSexteen();

}

