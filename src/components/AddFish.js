import React from 'react';
import PropTypes from 'prop-types';


class AddFish extends React.Component
{

    static propTypes = 
    {
        addfish:PropTypes.func,
        
    }
    
    nameRef     = React.createRef();
    priceRef     = React.createRef();
    statusRef     = React.createRef();
    descRef         = React.createRef();
    imageRef     = React.createRef();
    
    createFish = (event) => {
        // event.preventDefault();
        const fish = {
            name:this.nameRef.current.value,    
            price:parseFloat(this.priceRef.current.value),
            status:this.statusRef.current.value,
            desc : this.descRef.current.value,
            image:this.imageRef.current.value
        }
        
        console.log('clicked',fish);
        this.props.addfish(fish);
        event.currentTarget.reset();
    }
    // input
    render()
    {
        return (
            <form className="fish-edit" onSubmit={this.createFish} >
                <input ref={this.nameRef} type="text" name="name" placeholder="Name" />
                <input  ref={this.priceRef}type="text" name="price" placeholder="Price" />
            
                <select  ref={this.statusRef}name="status">
                    <option value="available">fresh</option>
                    <option value="unavailable">Sold OUt</option>
                </select>
                <textarea  ref={this.descRef} name="desc" placeholder="Desc" />  
                <input ref={this.imageRef} type="text" name="image"  placeholder="Image" />  
                <button type="submit">Add fish</button>
            </form>
            )
    }
}

export default AddFish;
