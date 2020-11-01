import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
background-color: ${props => props.alt ? 'red' : 'green'};
color: white;
font: inherit;
border: 1px solid blue;
padding: 8px;
cursor: pointer;

&:hover {
  background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
  color: black;
}
`;

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
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => (<Person key={person.id} changed={(event) => this.nameChangeHandler(event, person.id)} name={person.name} age={person.age} click={() => this.deletePersonHandler(index)} />))}
        </div>
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I 'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <StyledButton alt={this.state.showPersons} onClick={this.togglePersonHandler}>Toggle Persons</StyledButton>
        {persons}

      </div>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
