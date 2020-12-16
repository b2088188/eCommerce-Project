import React from 'react';
import PropTypes from 'prop-types';
import './ratingview.scss';

const RatingView = ({
	value,
	numReviews,
	color
}) => {
   
	return (
     <div className="rating">
     	<span className = "rating__star">
     		<i style = {{color}} className = {value >=1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'fas fa-star'}></i>
     	</span>
     	<span className = "rating__star">
     		<i style = {{color}} className = {value >=2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'fas fa-star'}></i>
     	</span>
     	<span className = "rating__star">
     		<i style = {{color}} className = {value >=3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'fas fa-star'}></i>
     	</span>
     	<span className = "rating__star">
     		<i style = {{color}} className = {value >=4 ? 'fas fa-star' : value >=3.5 ? 'fas fa-star-half-alt' : 'fas fa-star'}></i>
     	</span>
     	<span className = "rating__star">
     		<i style = {{color}} className = {value >=5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'fas fa-star'}></i>
     	</span>
     	<span>{numReviews && numReviews} reviews</span>
     </div>
		)
}

RatingView.defaultProps = {
	color: '#f8e825'
}
RatingView.propTypes = {
	value: PropTypes.number.isRequired,
	numReviews: PropTypes.number.isRequired,
	color: PropTypes.string
}

export default RatingView;