import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addContact = contact => {
    contact.id = nanoid();
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
    console.log(this.state);
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  onSubmit = evt => {
    evt.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number,
    };
    this.addContact(newContact);
    this.resetForm();
  };

  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { filter, contacts } = this.state;

    const cash = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

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
          <label className={css.contactLabel}>
            Number
            <input
              className={css.contactInput}
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleInputChange}
            />
          </label>
          <button className={css.addBtn} type="submit">
            Add contact
          </button>
        </form>
        <h3>Contacts</h3>
        <label className={css.contactLabel}>
          Find contacts by name
          <input
            className={css.contactInput}
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.handleInputChange}
          />
        </label>
        <ul>
          {cash.map(elm => {
            return (
              <li key={elm.id}>
                {elm.name}: {elm.number}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
