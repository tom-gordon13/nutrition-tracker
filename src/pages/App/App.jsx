import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import { getUser } from "../../utilities/users-service"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import AuthPage from '../AuthPage/AuthPage';
import DayViewPage from '../DayViewPage/DayViewPage';
import NavBar from '../../components/NavBar/NavBar';





function App() {
  const [user, setUser] = useState(getUser())
  
  return (
    <DndProvider backend={HTML5Backend}>
    <main className="App">
    { user ? 
    <>
    <NavBar user={user}/>
    <Routes>
      {/*  Route components in here */}
      <Route path="" element={<DayViewPage />} />
      
      {}
    </Routes>
    </>
    : 
    <AuthPage setUser={setUser}/>}
    
    </main>
    </DndProvider>
  );
}

export default App;
