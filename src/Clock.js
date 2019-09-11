/*eslint-env jquery*/

import React from 'react';
import './App.css';
import Controls from './Controls';

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state={
      intervalFlag: 0,
      indicating: "Session",
      breakLength: 5, 
      sessionLength: 25,
      minutes: 25,
      seconds:'00',
      timerFlag: "not running",
      breakFlag: false
    }
  }
   
  showCountdown = () => {
        let seconds = parseInt(this.state.seconds);
        let minutes = parseInt(this.state.minutes); // edw to parseInt prepei na ginei paroti arxika to minutes einai akeraios. Ka8e fora pou bazw mhdeniko sto min to min ginetai string opote prepei ka8e fora pou kaleitai h showCountdown na to kanw akeraio me to parseInt
        if(minutes < 10){minutes = ("0").concat(minutes)} // an ta lepta einai katw apo 10 tote bazw mhdeniko brosta gia na deixnei 08 kai oxi 8. Prosoxh edw to minutes ginetai string eksou kai to parseInt sthn arxh se ka8e kalesma ths sunarthshs
        if(seconds < 10){seconds = ("0").concat(seconds)} // omoiws kai edw
        this.setState({minutes: minutes, seconds: seconds});
    }
  
  beginCountdown = () => {
        let seconds = parseInt(this.state.seconds);
        let minutes = this.state.minutes; // edw den xreiazetai na ginei akeraios giati einai hdh akeraios kai den uparxei kapoia metatroph tou se string
        if(minutes == 0 && seconds == 0){ // shmainei pws eite exei teliwsei to session eite exei teliwsei to break opote prepei na elegksw an prepei na ksekinhsei break h session
            if(this.state.breakFlag === true){ // an einai true shmainei oti exei ginei break kai prepei na teliwsei to break kai na arxisei to session gia auto ta lepta sto setState einai osa grafei to sessionlength, to breakFlag ginetai false giati 8a teliwsei to break kai to indicating ginetai Session wste na xeroume oti ksekinaei neo Session countdown
                this.setState({
                  indicating: "Session",
                  minutes: this.state.sessionLength, 
                  breakFlag: false });
                  document.getElementById("beep").play(); // jQuery tropos na paikseis enan hxo. Epistrefei pinaka gia auto bazw to [0]
            }
            else{ // alliws an einai false shmainei pws prepei twra na ginei break gia auto ta lepta sto setState einai osa grafei to breakLength, omoiws breakFlag ginetai true kai indicating ginetai Break wste na xeroume oti twra ksekinaei to break
                this.setState({
                  indicating: "Break",
                  minutes: this.state.breakLength, 
                  breakFlag: true });
                  document.getElementById("beep").play();
            }
        }
        else if(seconds === 0){ // an ta seconds einai 0 kai ta minutes oxi tote ta seconds ginontai 59 kai meiwnw ta minutes kata 1
            this.setState({ seconds: 59, minutes: minutes - 1 });
        }
        else{ // afou ta seconds den einai 0 kai den einai kai ta minutes tote apla meiwnw ka8e fora ta seconds kata 1
            this.setState({ seconds: seconds - 1 });
        }
        this.showCountdown(); 
  }
  
  Actions = (action) => {
    
    if(action == "STARTSTOP") {
      if(this.state.timerFlag == "not running"){ // an exei stamathsei to roloi tote patwntas to start/stop to ksekinas kai allazeis thn katastash tou se "running" kai kaleis thn beginCountdown ka8e ena deuterolepto
            this.setState({ timerFlag: "running" });
            this.setState({intervalFlag : setInterval(this.beginCountdown, 1000) }); // kaleis thn beginCountdown ka8e ena deuterolepto kai mesa sthn beginCountdown kaleis sto telos thn showCountdown wste ka8e deuterolepto na allazei to roloi
        }
        if(this.state.timerFlag == "running"){ // an to roloi trexei tote patwntas start/stop to stamataw kai allazw thn katastash tou se "not running"
            this.setState({ timerFlag: "not running" });
            clearInterval(this.state.intervalFlag); //stamataw thn setInterval dhladh stamataw to countdown
        }                       
    }
    if(action == "RESET") { // otan pataw to koubi reset tote prepei ola na pane sthn arxikh tous katastash tou this.state kai prepei na stamathsw to countdown kai na kanw rewind ton hxo
      this.setState({
        intervalFlag: 0,
        indicating: "Session",
        breakLength : 5,
        sessionLength : 25,
        minutes : 25,
        seconds : '00',
        timerFlag: "not running",
        breakFlag: false
      });
      clearInterval(this.state.intervalFlag); // stamataw to countdown
      document.getElementById("beep").pause();// kanw pause ton hxo
      document.getElementById("beep").currentTime = 0;// kanw rewind ton hxo sthn arxh
    }
    if(action == "bdecr") { // otan pataw to koubi - sto breakLength tote to meiwnw kata 1
      if(this.state.breakLength>1)
     this.setState({breakLength: this.state.breakLength-1});
    }
    if(action == "bincr") { // otan pataw to koubi + sto breakLength tote to auxanw kata 1
      if(this.state.breakLength<60)
      this.setState({breakLength: this.state.breakLength+1});
    }
    if(action == "sdecr") { // otan pataw to koubi - sto sessionLength tote to meiwnw kata 1 kai prepei na meiwnetai antistoixa kai h diarkeia tou countdown dhladh ta minutes
      if(this.state.sessionLength>1)
      this.setState({
        sessionLength: this.state.sessionLength-1,
        minutes: this.state.sessionLength - 1
      });
    }
    if(action == "sincr") { // otan pataw to koubi + sto sessionLength tote to auxanw kata 1 kai prepei na auxanetai antistoixa kai h diarkeia tou countdown dhladh ta minutes
      if(this.state.sessionLength<60)
      this.setState({
        sessionLength: this.state.sessionLength+1,
        minutes: this.state.sessionLength + 1
      });
    }
  }

  render(){
    return(
     <div>
       <Controls
         Actions={this.Actions}
         breakLength={this.state.breakLength}
         sessionLength={this.state.sessionLength}
         indicating={this.state.indicating}
         minutes={this.state.minutes}
         seconds={this.state.seconds}
         timerFlag={this.state.timerFlag}
         breakFlag={this.state.breakFlag}
       />
       <audio id="beep" src="https://www.trekcore.com/audio/computer/computerbeep_73.mp3" />
     </div>
    )
  }
}

export default Clock;