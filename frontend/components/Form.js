import React from 'react'

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      todoItem: ''
    }}
    handleChange = (event) => {
      event.preventDefault();
      this.setState({
        ...this.state, todoItem: event.target.value
      })
  }
  submitForm = (event) => {
    event.preventDefault();
    console.log(`NEW LOG: ${this.state.todoItem}`)
    this.props.addToDoItem(event, this.state.todoItem);
    this.setState({
      ...this.state, todoItem: ''
    })
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div>
            <h1>Add Next To-Do Item</h1>
          </div>
          <br/>
          <input 
          type="text" name="ToDo" value={this.state.todoItem} onChange={this.handleChange} placeholder='Task'
          />
          <button>Add Todo</button>
        </form>
      </div>
    )
  }
}