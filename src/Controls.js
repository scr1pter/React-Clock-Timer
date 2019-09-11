import React from 'react';
import './App.css';

class Controls extends React.Component{
    // me ton tropo pou kaleitai h onClick se ka8e button, pernaw san argument to name tou ka8e button wste h Actions na xerei poio button path8hke kai na bei sthn antistoixh if 
    render(){
      return(
        <div>
          <h1>Pomodoro Clock</h1>
          <div id="main">
           <div id="break-label">
            <h3 id="break-title">Break Length</h3>
             <div id="br">
               <button id="break-decrement" name="bdecr" onClick={b => this.props.Actions(b.target.name)}>-</button> 
               <p id="break-length">{this.props.breakLength}</p>
               <button id="break-increment" name="bincr" onClick={b => this.props.Actions(b.target.name)}>+</button>
             </div>
          </div>
          <div id="session-label">
            <h3>Session Length</h3>
            <div id="ses">
               <button id="session-decrement" name="sdecr" onClick={b => this.props.Actions(b.target.name)}>-</button>
               <p id="session-length">{this.props.sessionLength}</p>
               <button id="session-increment" name="sincr" onClick={b => this.props.Actions(b.target.name)}>+</button>
            </div>
           </div>
           <div id="time">
              <p id="timer-label">{this.props.indicating}</p>
              <p id="time-left">{this.props.minutes}:{this.props.seconds}</p>
           </div>
            <div id="controls">
              <button id="start_stop" name="STARTSTOP" onClick={b => this.props.Actions(b.target.name)}>
              Start/Stop
              </button>
              <button id="reset" name="RESET" onClick={b => this.props.Actions(b.target.name)}>Reset</button>
            </div>
          </div>
       </div>
      )
    }
  }

  export default Controls;