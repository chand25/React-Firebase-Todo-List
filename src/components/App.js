import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';


class App extends Component {
  constructor() {
    super();
    this.state = { todos: {} };

    this.handleNewTodoInput = this.handleNewTodoInput.bind(this);
    this.renderTodoList = this.renderTodoList.bind(this);
    this.getTodos =this.getTodos.bind(this);
    this.createTodo =this.createTodo.bind(this);
    this.renderTodoList =this.renderTodoList.bind(this);
  }


 componentDidMount(){
  this.getTodos();
 }

getTodos(){
   const url = "https://mytodo-95fee.firebaseio.com/list/.json?print=pretty"
   axios.get(url)
.then((response) => {
  this.setState({todos:response.data});
  }).catch((error) => {
      console.log(error);
   })
}

  createTodo(todoText) {
    let newTodo = {title: todoText, createdAt: new Date()};

    const url = "https://mytodo-95fee.firebaseio.com/list/.json?print=pretty"
    axios.post(url, {
    data: newTodo
   }).then((response) =>{
       let todos = this.state.todos;
       let newTodoId =response.data.name;
       todos[newTodoId] = newTodo;
       this.setState({todos:todos});
    }).catch((error) => {
    console.log(error);
  });
}

renderTodoList () {
  let todoElements = [];
    for(let todoId in this.state.todos) {
      let todo = this.state.todos[todoId];
      todoElements.push(
        <div className="todo d-flex justify-content-between pb-4" key={todoId}>
          <div className="mt-2">
            <h4>{todo.title}</h4>
            <div>{moment(todo.createdAt).calendar()}</div>
          </div>
          <button className="ml-4 btn btn-link"onClick={ () => {this.deleteTodo(todoId)}}>
          <span aria-hidden="true">&time;</span>
          </button>
        </div>
      );
    }
    return (
      <div className="todo-list">
        {todoElements}
      </div>
    );
  }




  handleNewTodoInput(event) {
    if (event.charCode === 13) {
      this.createTodo(event.target.value);
      event.target.value = "";
    }
  }


  renderNewTodoBox() {
    return (
      <div className="new-todo-box pb-2">
        <input className="w-100" placeholder="What do you have to do?" onKeyPress={ this.handleNewTodoInput } />
      </div>
    );
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="row pt-3">
          <div className="col-6 px-4">
            {this.renderNewTodoBox()}
            {this.renderTodoList()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
