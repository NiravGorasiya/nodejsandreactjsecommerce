import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Product from './components/Product/Product';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/product' element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
