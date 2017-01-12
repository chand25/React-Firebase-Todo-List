import React, { Component } from 'react';
//import Tweed from './Tweed'



class TweedrFeed extends Component {

render() {
let tweedslist = this.props.tweeds.map((tweed, i) => {
    return(
      <li key={i}>{tweed.tweed}
          <i className="fa fa-trash pull-right" onClick={this.props.deleter}></i>
          <i className="fa fa-pencil pull-right" onClick={this.props.updater}></i>
      </li>
      );
  })
  return (
    <div className="panel-group">
       <div className="panel panel-default">
          <div id="listTitle" className="bg-primary text-white">A Penny for Your Tweeds</div>
             <div className="panel-body">
                  <ul className="message-board">
                      {tweedslist}
                  </ul>
             </div>
        </div>
    </div>
    );
  }
}
export default TweedrFeed;
