import React, { useState } from 'react';
import Login from './components/Login/Login.js';
import Dashboard from './components/Dashboard/Dashboard.js';

function App() {
  const [activeComponent, setActiveComponent] = useState('login');
  const [user, setUser] = useState('');
  
  const renderComponent = () => {
    switch (activeComponent) {
      case 'login':
        return <Login setActiveComponent={setActiveComponent} setUser={setUser} />;
      case 'dashboard':
        return <Dashboard user={user}/>;
    }
  }

  return (
    <div className="App">
      {renderComponent()}
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
