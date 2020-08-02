import React from "react";
import PropTypes from 'prop-types';



class EditFishForm extends React.Component
{
        
        static propTypes = 
        {
            index:PropTypes.string,
            fish:PropTypes.shape(
                    {
                        name:PropTypes.string,
                        desc:PropTypes.string,
                        image:PropTypes.string,
                        status:PropTypes.string,
                        price:PropTypes.number
                    }),
            deleteFish:PropTypes.func,
            updatefish:PropTypes.func,
            
            
        }
     
     
     handleChange = (event) =>
        {   
            event.preventDefault();
            // console.log('fish updated');
            //  take a copy of current fish
            //  computed property names 
            const updatedFish = {
            
            ...this.props.fish,
            [event.currentTarget.name]:event.currentTarget.value
            }
            
                      this.props.updatefish(this.props.index,updatedFish);
        }
    render()
    {
       
        return(
            <div>
            <form className="fish-edit"  >
                <input  onChange={this.handleChange} value={this.props.fish.name} type="text" name="name"  placeholder="Name" />
                <input  onChange={this.handleChange} value={this.props.fish.price} type="text" name="price"  placeholder="Price" />
            
                <select onChange={this.handleChange} value={this.props.fish.status} name="status">
                    <option onChange={this.handleChange} value="available">fresh</option>
                    <option onChange={this.handleChange} value="unavailable">Sold OUt</option>
                </select>
                <textarea onChange={this.handleChange} value={this.props.fish.desc} name="desc" placeholder="Desc" />  
                <input  onChange={this.handleChange} value={this.props.fish.image} type="text" name="image"  placeholder="Image" />  
                <button onClick={() => this.props.deleteFish(this.props.index)} >Remove Fish</button>
            </form>
            </div>
            )
    }
}

export default EditFishForm;