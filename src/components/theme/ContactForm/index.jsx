import React, { useContext, useState } from 'react';
import tw, { css, styled } from 'twin.macro';

import { ThemeContext } from 'providers/ThemeProvider';

const topics = [
  {
    name: "I'd like to join a project",
    id: 1,
  }
];

/**
 * Common Contact Form so that site visitors
 * can ask questions. The user needs to provide
 * the following information:
 *  * Name
 *  * Phone Number
 *  * Email Address
 *  * Topic
 *  * Subject
 *  * Message
 */
export const ContactForm = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState('');

  const handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };

  return (
    <div className="contact-form">
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={this.handleChange} />
        </label>

        <select>
          <option
        </select>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
