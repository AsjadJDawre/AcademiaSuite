import React, { useState } from 'react';
import Login from './components/Login/Login.js';
import Dashboard from './components/Dashboard/Dashboard.js';

function App() {
  const [activeComponent, setActiveComponent] = useState('login');
  
  const renderComponent = () => {
    switch (activeComponent) {
      case 'login':
        return <Login setActiveComponent={setActiveComponent} />;
      case 'dashboard':
        return <Dashboard/>;
    }
  }

  return (
    <div className="App">
      {renderComponent()}
    </div>
  );
}

export default App;
