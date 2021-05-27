import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";


function App() {
	const [products] = useState(data);
	const [ cart, setCart ] = useState( [] );
	
	useEffect( () => {
		console.log( 'localStorage', localStorage );
		if ( localStorage.getItem( "cart" ) ) {
			const parsedCart = JSON.parse( localStorage.getItem( "cart" ) );
			setCart( parsedCart );
			return;
		} else {
			return;
		}
	}, [] );

	console.log( 'cart empty:', cart );
	const addItem = item => {
		// add the given item to the cart
		const newCart = [ ...cart, item ];
		localStorage.setItem( "cart", JSON.stringify( newCart ) );
		setCart( [...cart, item] );
		console.log( 'cart with items: ', cart );
	};

	return (
		<div className="App">
			<ProductContext.Provider value={[ products, addItem ]} >
				<CartContext.Provider value={[cart]} >
					<Navigation />
				</CartContext.Provider>
				{/* Routes */}
				<Route exact path="/">
					<Products />
				</Route>
				<CartContext.Provider value={[cart, setCart]} >
					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	);
}

export default App;
