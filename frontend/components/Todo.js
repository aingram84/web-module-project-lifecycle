import React from 'react'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`item ${this.props.toDoListItem.completed ? "Completed" : ""}`} onClick={() => this.props.toggleItem(this.props.toDoListItem.id)}>
        <p>
        {this.props.toDoListItem.name}
        </p>
      </div>
    )
  }
}