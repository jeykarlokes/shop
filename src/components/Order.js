import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers'

class Order extends React.Component
{

    static propTypes = 
    {
        orders:PropTypes.object,
        deleteCart:PropTypes.func,
        fishes:PropTypes.shape(
            {
                name:PropTypes.string,
                desc:PropTypes.string,
                image:PropTypes.string,
                status:PropTypes.string,
                price:PropTypes.number
            })
    }
    
    renderItems = key => {
        const {orders,fishes} = this.props;
        const fish  = fishes[key];
        const  order = orders[key];
        const isAvailable = fish && fish.status === "available";
        console.log(orders);
        if(!order || !fish) 
        {
            return null;
        }
        else 
        {
            if(isAvailable)
            {
                return (
                     
                <li key={key} > {order}lbs {fish.name} {formatPrice(fish.price)}
                <button onClick={() =>this.props.deleteCart(key)}>X</button> </li>
            )
            }
            return <li key={key}>Sorry { fish ? fish.name : 'fish '} is no longer Available </li>
                
        }   
    }
    
    render()
    {
    
        const {orders,fishes} = this.props;
        const OrderIds = Object.keys(orders);
        const total = OrderIds.reduce((prevTotal,key) => {
            
            const fish = fishes[key];
            if(!fish) { return null; }
            const isAvailable = fish && fish['status'] === "available";
            
            if(isAvailable)
            {
                const price = fish['price'];
                const count = orders[key];
                return prevTotal + (count * price);
            }
            return prevTotal;
        },0);
        
        return (
            <div className="order-wrap">
                <h1>Order</h1>
                <ul className="order">
                    
                    {OrderIds.map(this.renderItems)}
                    <div className="total" >
                        <strong>Total {formatPrice(total ?  (total) : 0 )}</strong>
                    </div>
                </ul>
            </div>
            )
    }
}

export default Order;
