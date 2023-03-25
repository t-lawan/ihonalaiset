import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './Components/Pages/Home';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
