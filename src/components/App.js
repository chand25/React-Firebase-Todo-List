import React, { Component } from 'react';
import axios from 'axios';
import TweedrFeed from './TweedrFeed';
import Input from './Input'
import '../App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      tweeds: [],
      value: '',
    };
    this.getTweeds =this.getTweeds.bind(this);
    this.postTweeds = this.postTweeds.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTweeds = this.deleteTweeds.bind(this);
   // this.updateTweeds = this.updateTweeds.bind(this)
    //where we would bind functions
  }


componentDidMount(){
       this.getTweeds();
      }

getTweeds() {
 const url = "https://tweedrme.firebaseio.com/tweeds/.json?print=pretty"
  axios.get(url)
  .then((res) => {
       //console.log(res.data)
       const info = res.data;
       let tweeds =[];
       if (info) {
        tweeds = Object.keys(info).map((id) => {
          const tweed = info[id]
          //console.log(tweeds)
          return {
            tweed: tweed.tweed
          };
        });
       }
         tweeds.reverse();
         this.setState({ tweeds });
    })
  .catch((error) => {
    console.log(error);
  })
}



postTweeds(){
     const url = "https://tweedrme.firebaseio.com/tweeds/.json?print=pretty"
     axios.post(url, {
      tweed: this.state.value
    })
    .then(() =>{
      this.getTweeds();
      this.setState({value: '' })
    })
    .catch((error) => {
      console.log(error);
    })
  }

updateTweeds(){
  let newInput = document.createElement("INPUT");
  //const url = "https://tweedrme.firebaseio.com/tweeds/.json?print=pretty"
 }
 /*
  //axios.patch(`https://tweedrme.firebaseio.com/tweeds/${update}.json?print=pretty`,
  //{tweed: this.state.value
  })
then((response)=> {
  console.log(response);
})
.catch((error) => {
    console.log(error);
    })
}
*/
deleteTweeds(){
  //each data record has its own unique end point
  //access the keys for each record
   //axios.delete(`https://tweedrme.firebaseio.com/tweeds/${erase}.json?print=pretty`,
  let listItems = document.querySelectorAll('li')


console.log(listItems)
}



handleChange(event){
   this.setState({value: event.target.value})
 }

handleSubmit(event){
  event.preventDefault();
  this.postTweeds();
}

render(){
  return(
     <div className="App">
          <nav className="navbar navbar-inverse fixed-top ">
              <div className="container-fluid">
                  <div className="bg-primary">
                      <h1>Tweedr Me</h1>
                  </div>
              </div>
          </nav>
          <div className="container">
            <Input
                      writeTweed={this.handleChange}
                       postTweedDB={this.handleSubmit}
                       InputContent={this.state.value}

              />
             <TweedrFeed tweeds={this.state.tweeds}
                  deleter={this.deleteTweeds}
                  updater={this.updateTweeds}
             />
         </div>
      </div>
    );
  }
}
export default App;
