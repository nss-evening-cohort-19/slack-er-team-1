import { React, useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ setFilteredPosts, posts }) {
  const [input, setInput] = useState('');

  const postObj = posts;

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
    const results = postObj.posts.filter((post) => post?.name?.toLowerCase().includes(value.toLowerCase()));
    setFilteredPosts({ posts: results });
  };
  return (
    <form>
      <div className="form-group postSearch">
        <input type="search" className="form-control" name="postSearch" aria-describedby="iput" placeholder="search" value={input} onChange={handleChange} />
      </div>
    </form>
  );
}

Search.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string,
      content: PropTypes.string,
    },
  )).isRequired,
  setFilteredPosts: PropTypes.func.isRequired,
};
