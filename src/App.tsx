import { useEffect, useState } from 'react';
import { AppDialog } from './modules/common/cmps/AppDialog';
import { AppHeader } from './modules/common/cmps/AppHeader';
import { LobbyPage } from './modules/lobby/pages/LobbyPage';
import { useStore } from './store/useStore';
import { AppButton } from './modules/common/cmps/AppButton';


const App = () => {
  const getDataFromStorage = useStore(state => state.getDataFromStorage)
  const user = useStore(state => state.user)
  
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [userCred, setUserCred] = useState({
    email: '',
    password: ''
  })

  const login = useStore((state) => state.login)
  const logout = useStore((state) => state.logout)

  useEffect(() => {
    console.log('running on staging')
    getDataFromStorage()
  }, [])
  useEffect(() => {
    if (!user) {
      setIsLoginOpen(true)
    } else {
      setIsLoginOpen(false)
    }
  }, [user])

  const onLogin = (ev: any) => {
    ev.preventDefault()
    console.log('Login clicked')
    login(userCred)
  }

  const onLogout = () => {
    console.log('Logout clicked')
    logout()
  }

  const handleChange = (ev: any) => {
    setUserCred({ ...userCred, [ev.target.name]: ev.target.value })
  }

  return (
    <section id="App" className='flex column'>
      {/* <Router /> */}
      <AppHeader onLogin={() => setIsLoginOpen(true)} onLogout={onLogout} />
      <LobbyPage />

      {isLoginOpen &&
        <AppDialog onClose={() => null}>
          <div className="login-dialog-content">
            <form className='flex column gap-16 align-center'>
              <input type="email" placeholder="email" name="email" onChange={handleChange} />
              <input type="password" placeholder="password" name="password" id="" onChange={handleChange} />
              <AppButton text="Login" onClick={onLogin} />

            </form>
          </div>
        </AppDialog>
      }
    </section>

  );

};


export default App
