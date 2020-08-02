import React from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Sample_fishes from '../sample-fishes.js'
import base from '../base';

class App extends React.Component {
    
    static propTypes = {
        params:PropTypes.string,
    }
    
    state = {
        fishes:{},
        orders:{},
        
    };
    
    
    //  now merege our fish state with our firebase 
    // so we need lifecycle methods
    
    componentDidMount()
    {
        console.log(' App Mounted Successfully ');
        //  re instate the local storage
        const params = this.props.match.params;
        
        const localStorageRef = localStorage.getItem(params.storeId);
        console.log("local storage ref",localStorageRef);
        if (localStorageRef)
        {
            this.setState({orders:JSON.parse(localStorageRef)});
        }
        
        this.ref = base.syncState(`${params.storeId}/fishes`,{
            context:this,
            state:'fishes'
        });
        
    }
    
    componentDidUpdate()
    {
        console.log('compnoent updates');
        console.log(this.state.orders);
        
        localStorage.setItem(this.props.match.params.storeId,JSON.stringify(this.state.orders));
        
    }
    
    componentWillUnmount()
    {
        console.log('Unmounting App component ')
        base.removeBinding(this.ref);
        
    }
    
    
    //  below are the methods 
    
    addfish = fish => {
        // 1 take a copy of the state.
        const newfishes = {...this.state.fishes };
        //  add new fish to that fish
        newfishes[`fish ${Date.now()}`] = fish;
        this.setState({
            fishes:newfishes
        });
        // console.log('add fish');
    }
    
    loadSamples = () =>
    {
        console.log('loaded samples');
        this.setState({
            fishes:Sample_fishes
        })
    }
    
      
    updatefish =(key,fish) =>
    {   
        const updatedFish = {...this.state.fishes}
        updatedFish[key] = fish;
        console.log(updatedFish)
        this.setState({fishes:updatedFish});
    }
    
    deleteFish = (key) =>
    {
        const updatedFish = {...this.state.fishes}
        updatedFish[key] = null;
        // console.log(updatedFish)
        this.setState({fishes:updatedFish});
    }
    
    //  cart methods below 
    
    addtocart = (key) =>
    {
        // console.log(key);
        const  order = {...this.state.orders};
        
        // const name1 = this.state.fishes[key];
        
        order[key] = order[key] + 1 || 1;
        // console.log(order);
        this.setState({orders:order})
    }
    
    deleteCart = (key) =>
    {
        const order = {...this.state.orders };
        delete order[key];
        this.setState({orders:order});
        
    }
    
  
    
    render() {
        return (
            <div className="catch-of-the-day">
             
                <div className="menu">
                    <Header tagline={"FRESH SEAFOOD MARKET"} />
                    <Menu  fishes={this.state.fishes}
                    addtocart={this.addtocart}/>
                </div>
                
                
               <Order deleteCart={this.deleteCart} orders={this.state.orders} fishes={this.state.fishes} />
              
              
               <Inventory loadSamples={this.loadSamples} 
                storeId={this.props.match.params.storeId}
                addfish={this.addfish}
                fishes = {this.state.fishes}
                deleteFish={this.deleteFish}
                updatefish={this.updatefish}
                />
               
            </div>
            )
    }
}

export default App;