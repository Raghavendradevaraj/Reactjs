
import React, { useState } from 'react';
import Component1 from './Components/MainWindow';
import Component2 from './Components/SuggestionsPage';
import Component3 from './Components/Roadmap';

import './App.css';

const App = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'component1':
        return <Component1 />;
      case 'component2':
        return <Component2 />;
      case 'component3':
        return <Component3 />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <h1>Assignment</h1>


      <div className="button-container">
        <button onClick={() => setActiveComponent('component1')}>MainWindow</button>
        <button onClick={() => setActiveComponent('component2')}>Suggestions</button>
        <button onClick={() => setActiveComponent('component3')}>Roadmap</button>
      </div>


      {activeComponent && renderComponent()}
    </div>
  );
};

export default App;