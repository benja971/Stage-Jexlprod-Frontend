import "./App.css";
import Home from "./Containers/Home/Home";
import { Route, Routes } from "react-router-dom";
import CollabForm from "./Containers/CollabForm/CollabForm";
import Sales from "./Containers/Sales/Sales";
import SaleForm from "./Containers/SaleForm/SaleForm";
import Login from "./Containers/Login/Login";

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/collaborateurs' element={<Home />} />
				<Route path='/collaborateurs/collaborateur' element={<CollabForm />} />
				<Route path='/ventes' element={<Sales />} />
				<Route path='/ventes/vente' element={<SaleForm />} />
			</Routes>
		</div>
	);
}

export default App;
