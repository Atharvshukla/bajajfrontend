import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://bajaj-api-backend.onrender.com', parsedJson);
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON or request failed');
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(prevOptions =>
      prevOptions.includes(value)
        ? prevOptions.filter(option => option !== value)
        : [...prevOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div>
        {selectedOptions.includes('numbers') && <p>Numbers: {JSON.stringify(numbers)}</p>}
        {selectedOptions.includes('alphabets') && <p>Alphabets: {JSON.stringify(alphabets)}</p>}
        {selectedOptions.includes('highest_lowercase_alphabet') && (
          <p>Highest Lowercase Alphabet: {JSON.stringify(highest_lowercase_alphabet)}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL JSON Processor 21BCE2886 </h1>
      <h1>https://bajaj-api-backend.onrender.com/api/v1/bfhl </h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here...'
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Select Data to Display</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_lowercase_alphabet"
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;