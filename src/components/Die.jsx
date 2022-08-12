import React from 'react'

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff"
}

function dot () {
    if (props.value === 1) {
      return (
        <div className="dice first-face">
        <span className="value"></span>
        </div>
      )
    }else if(props.value === 2){
      return (
        <div className="dice second-face">
        <span className="value"></span>
        <span className="value"></span>
        </div>
      )
    }else if(props.value === 3) {
      return (
        <div className="dice third-face">
        <span className="value"></span>
        <span className="value"></span>
        <span className="value"></span>
      </div>
      )
    }else if(props.value === 4) {
      return (
      <div className="dice fourth-face">
        <div className="column">
          <span className="value"></span>
          <span className="value"></span>
        </div>
        <div className="column">
          <span className="value"></span>
          <span className="value"></span>
        </div>
      </div>
      )
    }else if(props.value === 5) {
      return (
        <div className="fifth-face dice">
         <div className="column">
          <span className="value"></span>
          <span className="value"></span>
        </div>
        
        <div className="column">
          <span className="value"></span>
        </div>
        
        <div className="column">
          <span className="value"></span>
          <span className="value"></span>
        </div>
      </div>
     )
    }else{
      return(
        <div className="fourth-face dice">
        <div className="column">
            <span className="value"></span>
            <span className="value"></span>
            <span className="value"></span>
          </div>
        <div className="column">
            <span className="value"></span>
            <span className="value"></span>
            <span className="value"></span>
        </div>
      </div>
      )
    }

}
  return (
    
   <div className='die-box' style={styles}  onClick={props.holdDice}> 
    {dot()}
    </div>
  )
}

export default Die;

//<span className="value">{props.value}</span>  