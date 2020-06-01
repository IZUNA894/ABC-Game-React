import React from 'react';
import './App.css';
import Switch from "react-switch";
import data from './original.json'
import UIFx from 'uifx';
import classNames from 'classnames';

const bell = new UIFx("#");
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      soundChecked:true,
      randomChecked:false,
      letter:'A',
      word:'',
      wordSoundLink:'',
      letterSoundLink:'',
      imgLink:'',
      index:0
    }
  }
  setLetter =()=>{
    var index = this.state.index;
    console.log(index);
    var letter =undefined;
    var word = undefined;
    var wordSoundLink = undefined;
    var imgLink = undefined;
    var letterSoundLink = undefined;

    letter = data[index].letter;
    imgLink = data[index].image;
    wordSoundLink = data[index].wordSound;
    letterSoundLink = data[index].letterSound;
    word = data[index].word;

    this.setState({index,letter,word,wordSoundLink,letterSoundLink,imgLink});

  }
  onSoundChange = (e)=>{
    this.setState({soundChecked:e})
    if(e){
      console.log('hh')
      //true
      bell.setVolume(1.0);
    }
    else{
      //false
      console.log('called')
      bell.setVolume(0.0);
    }
    console.log(e);
  }
  onRandomChange = (e)=>{
    this.setState({randomChecked:e})
    console.log(e);
  }
  handleNext = ()=>{
    var index = this.state.index;
    if(this.state.randomChecked){
      //if user select for random
      index = Math.floor(Math.random() * 100 ) %26
    }else{
      //if user need sequential
      if(index == 25)
      index = -1;

      index++;
    }
    
    console.log(index)
    this.setState({index},()=>this.setLetter());
  }
  handlePrevious = ()=>{
    var index = this.state.index;
    if(index == 0)
      index = 26;
    
    index--;
    this.setState({index},()=>this.setLetter());


  }

  playWordSound =()=>{
    bell.file = this.state.wordSoundLink;
    bell.play();
    console.log(bell);
  }
  playLetterSound =()=>{
    bell.file = this.state.letterSoundLink;
    bell.play();
    console.log(bell);
  }
  componentWillMount(){
    this.setLetter();
  }

  render(){
    console.log(this.state)
    var prevBtnClass = classNames('waves-effect', 'waves-light', 'btn',  'green', 'darken-3',{disabled:this.state.randomChecked})


    var Img = this.state.imgLink ? <img style={{height:'30vh'}}src={this.state.imgLink} onClick={this.playWordSound}/>:'click next for img'

  
    return (
      <div className="App">
        
        {/* heading */}
        <div className="row">
            <div className="col s12 black white-text valign-wrapper center-align">
              <h1 className="center-align">Easy ABC</h1>
            </div>
          </div>
        <div className="row pink">
          {/* two toggles */}
          <div className="row ">
            <div className="col s12" style={{textAlign: 'center'}}>
              <div className="wrapper">
                <label>
                  <span className="text1 white-text">Random Letters</span>
                  <Switch
                    onChange={this.onRandomChange}
                    checked={this.state.randomChecked}
                    handleDiameter={28}
                    offColor="#08f"
                    onColor="#0ff"
                    offHandleColor="#0ff"
                    onHandleColor="#08f"
                    height={40}
                    width={70}
                    className="react-switch"
                  />
                </label>
                <label>
                  <span className="text2 white-text">Sound</span>
                  <Switch
                    onChange={this.onSoundChange}
                    checked={this.state.soundChecked}
                    handleDiameter={28}
                    offColor="#08f"
                    onColor="#0ff"
                    offHandleColor="#0ff"
                    onHandleColor="#08f"
                    height={40}
                    width={70}
                    className="react-switch"
                  />
                </label>
              </div>

  
            </div>
          </div>
          {/* Letter row */}
          <div className="row letterParentClass pink lighten-3">
            <div className="col s12 white-text  valign-wrapper " onClick={this.playLetterSound}>
                <span className="letter-cell-text">{this.state.letter}</span>
            </div>
          </div>
          {/* Three buttons */}
          <div className="row">
            <div className="col s12 center-align" >
              <a className={prevBtnClass} style={{width:'8vw'}} onClick = {this.handlePrevious}>Previous</a>
              <a className="waves-effect waves-light btn yellow darken-4" style={{width:'20vw'}} onClick={this.playLetterSound}>Play sound Again</a>
              <a className="waves-effect waves-light btn  light-blue" style={{width:'8vw'}} onClick = {this.handleNext}>Next</a>
            </div>
          </div>
          {/* word and image row */}
          <div className="row wordParentClass pink lighten-3 white-text">
          <div className="col s6 center-align valign-wrapper">
            <span className="imageClass center-align">
            {Img}
            </span>
          </div>
          <div className="col s6 center-align valign-wrapper">
            <span className="wordClass center-align" onClick={this.playWordSound}>
              {this.state.word?this.state.word :'click next for splelling'}
            </span>
          </div>
        </div>
        </div>



      </div>
    )
  }
}

export default App;
