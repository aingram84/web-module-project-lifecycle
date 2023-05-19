import React from 'react'
import Todo from './Todo';
import Form from './Form';
import TodoList from './TodoList';
import axios from 'axios';

const todoList = [];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: todoList
    }
  }

  addToDoItem = (todoItem) => {
    // // event.preventDefault();
    // const newToDoList = {
    //   name: todoItem,
    //   id: Date.now(),
    //   completed: false
    // }

    console.log('heresssssss Loggy');
    var todoObject = { name: String(todoItem), completed: false };
    if (todoObject == undefined || todoObject.name == undefined) {
      console.log('I AM UNDEFINED');
    }

    console.log(`todo item FIRST ${todoItem}`);
    console.log(`todo item NAME ${String(todoObject.name)}`);

    if (todoObject !== undefined && todoObject.name !== undefined) {
      console.log(`todo item ${String(todoItem)}`);
      this.postTask(String(todoObject.name));
      console.log(`here is todotitem ${todoObject}`)
    }


    axios.get(`http://localhost:9000/api/todos`)
      .then((res) => {
        console.log(res.data.data);
        // var filtered = res.data.data.filter(task => task !== undefined);
        this.setState({
          ...this.state, todoList: [...res.data.data]
        })
      })
      .catch(err => console.error('error when fetching'))


  }

  clearCompleted = () => {
    for (let i = 0; i < this.state.todoList.length; i++) {
      console.log(`Here is the TDL ${this.state.todoList[i]}`);
      if (this.state.todoList[i] !== undefined && this.state.todoList[i].name !== undefined && this.state.todoList[i].completed == true) {

        
        var todo = this.state.todoList[i].id;
        this.patchTask(todo);
        console.log(`${todo} is completed and cleared.`)
      }
    }
    this.setState({
      ...this.state, todoList: this.state.todoList.filter((toDoListItem) => {
        if (!toDoListItem.completed) return toDoListItem;
      }),
    })
  }

  toggleItem = (itemID) => {
    console.log(itemID)
    this.setState({
      ...this.state, todoList: this.state.todoList.map((toDoListItem) => {
        if (itemID === toDoListItem.id) {
          console.log(`${toDoListItem.name} is completed: ${toDoListItem.completed}`)
          return {
            ...toDoListItem, completed: !toDoListItem.completed
          }
        }
        console.log(`${toDoListItem.name} is completed: ${toDoListItem.completed}`)
        console.log(toDoListItem);
        return toDoListItem;
      })
    })
  }

  fetchTask = () => {
    return axios.get(`http://localhost:9000/api/todos`).then(res => res).catch(err => console.error('error when fetching'))
  }

  postTask = (name) => {
    return axios.post(`http://localhost:9000/api/todos`, {
      name: name
    }).then(res => res).catch(err => console.error('error when posting'))
  }

  patchTask = (id) => {
    return axios.put(`http://localhost:9000/api/todos/${id}`).then(res => res).catch(err => console.error(`error when patching ${id}`))
  }

  componentDidMount = (todoItem) => this.addToDoItem(todoItem);

  render() {
    return (
      <div>
        <div className="App">
          <Form addToDoItem={this.addToDoItem} />
        </div>
        <TodoList toggleItem={this.toggleItem} todoList={this.state.todoList} />
        <br></br>
        <button onClick={this.clearCompleted}>Clear Completed</button>
      </div>
    )
  }
}