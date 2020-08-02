import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';



class Fish extends React.Component
{
    
static propTypes = 
    {
        fishes:PropTypes.shape(
            {
                name:PropTypes.string,
                desc:PropTypes.string,
                image:PropTypes.string,
                status:PropTypes.string,
                price:PropTypes.number
            }),
        addtocart:PropTypes.func,
        index:PropTypes.string,
        
        
    }

handleCart =  () =>
{
 this.props.addtocart(this.props.index);
}


    render()
    {
        const {name,price,desc,image,status} = this.props.fish;
        const isAvailable = status === "available";
        return (
        <ul>
        <li className="menu-fish">
            <h3 className="fish-name">{name}
            <span className="price">{formatPrice(price)}</span></h3>
            <img src={image} alt={name} />
            <p>{desc}</p>
            <button disabled={!isAvailable} onClick={this.handleCart} >{isAvailable ? 'Add To Cart' : 'Sold Out'}</button>
        </li>
        </ul>
        )
    }
}

export default Fish;
