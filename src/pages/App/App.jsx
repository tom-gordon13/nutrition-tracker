import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import { getUser } from "../../utilities/users-service"
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage"
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';



function App() {
  const [user, setUser] = useState(getUser())
  
  return (
    <main className="App">
    { user ? 
    <>
    <NavBar user={user}/>
    <Routes>
      {/*  Route components in here */}
      <Route path="orders/new" element={<NewOrderPage />} />
      <Route path="orders" element={<OrderHistoryPage />} />
      {}
    </Routes>
    </>
    : 
    <AuthPage setUser={setUser}/>}
    
    </main>
  );
}

export default App;
