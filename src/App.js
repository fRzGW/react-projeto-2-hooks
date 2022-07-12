import P, { func } from 'prop-types';
import { useEffect, useState, useMemo, useRef } from 'react';
import './App.css';

const Post = ({ post, handleClick }) => {
  console.log('Filho renderizou');
  return (
    <div key={post.id} className="post">
      <h1 style={{ fontSize: '14px' }} onClick={() => handleClick(post.title)}>
        {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  );
};

Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
  handleClick: P.func,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const input = useRef(null); // cria referencia para alguma coisa
  const contador = useRef(0);

  console.log('Pai renderizou');

  // Component Did Mount
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((response) => setPosts(response));
  }, []);

  useEffect(() => {
    // sempre que value mudar este useEffect vai ser executado
    input.current.focus();
    console.log(input.current);
  }, [value]);

  useEffect(() => {
    contador.current++;
  });

  const handleClick = (value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <h1>Rederizou: {contador.current}x</h1>
      <p>
        <input
          ref={input} // damos a referencia ao input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </p>
      {useMemo(() => {
        return posts.map((post) => (
          <Post key={post.id} post={post} handleClick={handleClick} />
        ));
      }, [posts])}
    </div>
  );
}

export default App;
