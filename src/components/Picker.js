import React, { PropTypes } from 'react';

const Picker = ({ value, onChange, options }) => {
  return (
    <span>
      <h1>{value}</h1>
      <select onChange={e => onChange(e.target.value)} value={value}>
        {options.map(subreddit => 
          <option value={subreddit} key={subreddit}>
            {subreddit}
          </option>)
        }  
      </select>
    </span>
  );
};

// PropTypes here

export default Picker;