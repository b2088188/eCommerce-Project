import React, {useState, useContext} from 'react';
import ProductContext from '../stores/product/productContext';
import {useRouteMatch} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

const Search = () => {
	const [query, setQuery] = useState('');
	const {getAllProducts} = useContext(ProductContext);

	function onSubmit(e) {
		e.preventDefault();
		getAllProducts(query)
	}

	return (
		<Form onSubmit = {onSubmit} inline>
			<Form.Control className = 'mr-sm2 ml-sm-5' type = 'text' name = 'query' placeholder = 'Search Products...' onChange = {(e) => setQuery(e.target.value)}>				
			</Form.Control>
			<Button type = 'submit' variant = 'outline-success' className = 'p-2'>
				Search
			</Button>
		</Form>
		)
}

export default Search;