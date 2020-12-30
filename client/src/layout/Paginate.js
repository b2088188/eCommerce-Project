import React from 'react';
import {Pagination} from 'react-bootstrap';
import {LinkContainer	} from 'react-router-bootstrap';

const Paginate = () => {
	
	function generatePageNum(pages) {
		return [...Array(pages).keys()].map(el => 
			<LinkContainer key = {el + 1} to = >
				<Pagination.Item active = {el + 1 === currentPage}>{el + 1}</Pagination.Item>
			</LinkContainer>
			)
	}

	return (
		<div>
			
		</div>
		)
}

export default Paginate