import React from 'react'
import Todo from './Todo';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='todo-list'>
        <h2>My Task List</h2>
        {this.props.todoList.map((toDoListItem) => (
        <Todo toggleItem={this.props.toggleItem} key={toDoListItem.id} toDoListItem={toDoListItem} />
        ))}

      </div>
    )
  }
}