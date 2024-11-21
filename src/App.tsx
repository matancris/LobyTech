import { AppHeader } from './modules/common/cmps/AppHeader';
import { LobbyPage } from './modules/lobby/pages/LobbyPage';
// import { useStore } from './store/useStore';


const App = () => {


  return (
    <section id="App" className='flex column'>
      {/* <Router /> */}
      <AppHeader />
      <LobbyPage />
    </section>

  );

};


export default App
