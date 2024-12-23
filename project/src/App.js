import React from 'react';
import { createRoot } from 'react-dom/client';
import CodeViewer from './components/CodeViewer';

const App = () => {
  return (
    <div className="app">
      <CodeViewer />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;