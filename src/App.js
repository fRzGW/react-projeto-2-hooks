import './App.css';
import { useState, useEffect } from 'react';
import userEvent from '@testing-library/user-event';

const eventFn = () => {
  console.log('h1 clicado');
};

// -> Hooks devem estar no nível superior da função, nunca dentro de blocos, loops, e condicionais.

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // componentDidUpdate - executa toda vez que o componente for atualizado
  // useEffect(() => {
  //   console.log('componentDidUpdate');
  // });

  // componentDidMount - executa 1x
  useEffect(() => {
    document.querySelector('h1')?.addEventListener('click', eventFn);

    // componentWillUnmount - limpeza pra não bugar o código
    return () => {
      document.querySelector('h1')?.removeEventListener('click', eventFn);
    };
  }, []);

  // Com dependencia - executa quando a dependencia mudar
  useEffect(() => {
    console.log('C1:', counter, 'C2:', counter2);
  }, [counter, counter2]); // toda vez que counter mudar

  return (
    <div className="App">
      <p>Teste 2</p>
      <h1>
        C1: {counter} C2: {counter2}
      </h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter2(counter2 + 1)}>+(2)</button>
    </div>
  );
}

export default App;
