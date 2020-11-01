import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {
        id: 'Max',
        name: 'Max',
        age: '28'
      },
      {
        id: 'Manu',
        name: 'Manu',
        age: '29'
      },
      {
        id: 'Stephanie',
        name: 'Stephanie',
        age: '26'
      },
    ],
    otherState: 'some other value',
    showPersons: false
  }
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({
      persons: persons
    });
  }
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }
  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }
  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => (<Person key={person.id} changed={(event) => this.nameChangeHandler(event, person.id)} name={person.name} age={person.age} click={() => this.deletePersonHandler(index)} />))}
        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I 'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button onClick={this.togglePersonHandler} style={style}>Toggle Persons</button>
          {persons}

        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
