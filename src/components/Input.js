import React, { Component } from 'react';




class Input extends Component {

render(){
  return(
  <div className="panel-group">
          <div className="panel panel-danger">
                 <div className="panel-body">
                      <form id="msg-form" className="form-inline" onSubmit={this.props.postTweedDB}>
                          <input className="form-control mr-sm-2" size="35" type="text" value={this.props.InputContent} onChange={this.props.writeTweed}/>
                          <input type="submit" value="Share" />
                      </form>
                  </div>
          </div>
  </div>

    );
  }
}
export default Input;
