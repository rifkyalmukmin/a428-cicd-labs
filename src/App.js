import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      todos: [],
      inputValue: '',
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrementCount = () => {
    this.setState({ count: this.state.count - 1 });
  }

  resetCount = () => {
    this.setState({ count: 0 });
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  addTodo = () => {
    if (this.state.inputValue.trim() !== '') {
      this.setState({
        todos: [...this.state.todos, { id: Date.now(), text: this.state.inputValue, completed: false }],
        inputValue: ''
      });
    }
  }

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  render() {
    const { count, todos, inputValue, time } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <h1>Welcome to My App</h1>
            <p className="tagline">Make your day more productive</p>
          </div>
        </header>

        <main className="App-main">
          <div className="container">
            {/* Clock Card */}
            <div className="card clock-card">
              <h2>Current Time</h2>
              <div className="clock">
                {time.toLocaleTimeString()}
              </div>
              <p className="date">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Counter Card */}
            <div className="card counter-card">
              <h2>Counter</h2>
              <div className="counter-display">{count}</div>
              <div className="button-group">
                <button className="btn btn-minus" onClick={this.decrementCount}>−</button>
                <button className="btn btn-reset" onClick={this.resetCount}>Reset</button>
                <button className="btn btn-plus" onClick={this.incrementCount}>+</button>
              </div>
            </div>

            {/* Todo List Card */}
            <div className="card todo-card">
              <h2>My Tasks</h2>
              <div className="todo-input-group">
                <input
                  type="text"
                  placeholder="Add a new task..."
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onKeyPress={this.handleKeyPress}
                  className="todo-input"
                />
                <button className="btn btn-add" onClick={this.addTodo}>Add</button>
              </div>

              {todos.length === 0 ? (
                <p className="empty-state">No tasks yet. Add one to get started! 🚀</p>
              ) : (
                <ul className="todo-list">
                  {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => this.toggleTodo(todo.id)}
                        className="todo-checkbox"
                      />
                      <span className="todo-text">{todo.text}</span>
                      <button
                        className="btn-delete"
                        onClick={() => this.deleteTodo(todo.id)}
                        title="Delete task"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Stats Card */}
            <div className="card stats-card">
              <h2>Your Stats</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{count}</div>
                  <div className="stat-label">Total Counts</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{todos.length}</div>
                  <div className="stat-label">Total Tasks</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{todos.filter(t => t.completed).length}</div>
                  <div className="stat-label">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="App-footer">
          <p>Made with ❤️ | CI/CD Labs Application</p>
        </footer>
      </div>
    );
  }
}

export default App;
