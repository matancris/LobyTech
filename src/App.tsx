import { useStore } from './store/useStore';


const App = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Zustand Example</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement} style={{ marginLeft: '10px' }}>
        Decrement
      </button>
    </div>
  );
};


export default App
