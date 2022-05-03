import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Send from './components/Send';
import Test from './components/Test/Test';


function App() {
	return (
		<div className="App">
			<Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/send" element={<Send />} />
            <Route path="/test" element={<Test />} />
        
          </Routes>
        </div>
      </Router>
		</div>
	);
}

export default App;
