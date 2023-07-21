import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the styles

const App = () => {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    // Implement your API call here, I'll use a dummy setTimeout to simulate the response
    // In a real scenario, you should use axios.post to make the API call to your backend
    // For example:
e.preventDefault();
    axios.post('http://localhost:3000/send', { amount, phone })
      .then((response) => {
        console.log(response);
        // Handle the success response
      })
      .catch((error) => {
        console.log(error);
        // Handle the error response
      });

    // Simulating the API call with setTimeout
    setTimeout(() => {
      alert('Payment successful!');
    }, 1500);
  };

  return (
    <div className="container"> {/* Apply the container class */}
      <h1 className="heading">Vite App with React and Animation</h1> {/* Apply the heading class */}
      <div className="input-container"> {/* Apply the input-container class */}
        <input
          type="text"
          className="input" 
          placeholder="Enter amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <input
          type="text"
          className="input" 
          placeholder="Enter phone number"
          value={phone}
          onChange={handlePhoneChange}
        />
        <button className="submit-button" onClick={handleSubmit}>Submit</button> 
      </div>
    </div>
  );
};

export default App;
