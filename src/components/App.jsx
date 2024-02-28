import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section';
import ContactForm from './ContactForm';
import Contacts from './Contacts';
import Filter from './Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length < 1) {
      localStorage.removeItem('contacts');
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = ({ name, number, e }) => {
    e.preventDefault();

    const newContact = onCheckContact(name.toLowerCase());

    if (newContact) {
      return alert(`${name} is already in contacts`);
    }

    return setContacts(state => [
      ...state,
      { id: nanoid(), name: name, number: number },
    ]);
  };

  const onCheckContact = value => {
    return contacts.some(({ name }) => name.toLocaleLowerCase() === value);
  };

  const onFilterContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter)
    );
  };

  const onRemoveContact = contactId => {
    const newContacts = contacts.filter(({ id }) => id !== contactId);

    setContacts(newContacts);
  };

  return (
    <Section>
      <ContactForm onAddContact={onAddContact} />

      {contacts.length > 0 && (
        <Filter
          label="Find contacts by name"
          value={filter}
          onSearchContacts={e => setFilter(e.currentTarget.value.toLowerCase())}
        />
      )}

      {contacts.length > 0 && (
        <Contacts
          contacts={onFilterContacts()}
          onRemoveContact={onRemoveContact}
        />
      )}
    </Section>
  );
};

export default App;
