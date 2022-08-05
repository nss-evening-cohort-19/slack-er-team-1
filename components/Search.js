import { React, useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ setFilteredThreads, threads }) {
  const [input, setInput] = useState('');

  const threadObj = threads;

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    const results = threadObj.Threads.filter((thread) => thread?.name?.toLowerCase().includes(value.toLowerCase()));
    setFilteredThreads({ threads: results });
  };
  return (
    <form>
      <div className="form-group Threadsearch">
        <input type="search" className="form-control" name="threadSearch" aria-describedby="iput" placeholder="search" value={input} onChange={handleChange} />
      </div>
    </form>
  );
}

Search.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string,
      content: PropTypes.string,
    },
  )).isRequired,
  setFilteredThreads: PropTypes.func.isRequired,
};
