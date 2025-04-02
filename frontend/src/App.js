// default js file (add code change the name whatever )
// import React from 'react'

// function App() {
//   return (
//     <div>

//     </div>
//   )
// }
// export default App
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login'; // Ensure Login.js is in the same folder as App.js
import Register from './Register'; // Ensure Register.js is in the same folder as App.js
import Header from './Header';

function App() {
  return (
    <Router>
      {/* Navigation Links */}
      <nav style={{ position: 'absolute', top: '20px', right: '20px' }}>
  <Link to="/">Login</Link> | <Link to="/register">Register</Link>
  <Link to="/home">HomePage</Link> | 
</nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Header />} />
      </Routes>
    </Router>
  );
}

export default App;