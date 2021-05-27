import React, { useContext } from 'react';
import { CartContext } from "../contexts/CartContext";


const Item = props => {
	const [ cart, setCart ] = useContext( CartContext );

	const removeFromCartHandler = (id) => {
		const newCart = cart.filter( item => item.id !== id )
		localStorage.setItem( "cart", JSON.stringify(newCart) );
		setCart( newCart );
	}
 
	return (
		<div className="shopping-cart_item">
			<img src={props.image} alt={`${props.title} book`} />


			<div>
				<h1>{props.title}</h1>
				<p>$ {props.price}</p>
				<button onClick={() => removeFromCartHandler(props.id)}>Remove from cart</button>
			</div>
		</div>
	);
};

export default Item;
