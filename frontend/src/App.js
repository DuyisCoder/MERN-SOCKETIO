import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatsPage from './Components/ChatPage/ChatsPage';
import HomePage from './Components/Home/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/chats' Component={ChatsPage} />
      </Routes>
    </div>
  );
}

export default App;
