import React, { useState } from 'react';

interface SearchCharacterProps {
  value: string;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
}

const SearchCharacter: React.FC<SearchCharacterProps> = (props:SearchCharacterProps) => {
  const [input, setInput] = useState(props.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    props.onSearch(input);
  };

  const handleClear = () => {
    setInput('');
    props.onClear();
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '95%', padding: '8px' }}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyUp={(e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        })}
        placeholder="Search character..."
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: input===''?'180px':'140px',
        }}
      />
      {input && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            width: '30px',
          }}
        >
          &#10006;
        </button>
      )}
      <button onClick={handleSearch} disabled={!input}>Search</button>
    </div>
  );
};

export default SearchCharacter;
