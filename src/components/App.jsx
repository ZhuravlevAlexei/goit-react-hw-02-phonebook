import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  addContact = data => {
    data.id = nanoid();
    this.setState(prevState => ({
      contacts: [data, ...prevState.contacts],
    }));
    console.log(this.state);
  };

  resetForm = () => {
    this.setState({ name: '' });
  };

  onSubmit = evt => {
    evt.preventDefault();
    // console.log(evt);
    //const { contacts } = this.state;
    const data = { name: this.state.name };
    this.addContact(data);
    this.resetForm();
    // console.log(this.state);
  };

  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({
      [name]: value,
    });
    // console.log(this.state);
  };

  render() {
    return (
      <div className={css.phonebookArea}>
        <h3 className={css.mainTitle}>Phonebook</h3>
        <form className={css.contactForm} onSubmit={this.onSubmit}>
          <label className={css.contactLabel}>
            Name
            <input
              className={css.contactInput}
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleInputChange}
            />
          </label>
          {/* <label className={css.contactLabel}>
            Number
            <input
              className={css.contactInput}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label> */}
          <button className={css.addBtn} type="submit">
            Add contact
          </button>
        </form>
        <h3>Contacts</h3>
        <ul>
          {this.state.contacts.map(elm => {
            return <li key={elm.id}>{elm.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
