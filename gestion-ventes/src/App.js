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
				<Route path='/' element={<Home />} />
				<Route path='/collaborateur' element={<CollabForm />} />
				<Route path='/ventes' element={<Sales />} />
				<Route path='/ventes/ajouter' element={<SaleForm />} />
				<Route path='/ventes/modifier' element={<SaleForm />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
