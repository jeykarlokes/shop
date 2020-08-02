import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFish from './AddFish'
import EditFishForm from "./EditFishForm";
import Login from './Login';
import base,{ firebaseApp } from '../base';

class Inventory extends React.Component
{

    static propTypes = 
    {
        loadSamples:PropTypes.func,
        addfish:PropTypes.func,
        fishes:PropTypes.shape(
            {
                name:PropTypes.string,
                desc:PropTypes.string,
                image:PropTypes.string,
                status:PropTypes.string,
                price:PropTypes.number
            }),
        deleteFish:PropTypes.func,
        updatefish:PropTypes.func
    }
    
    state = {
        uid:null,owner:null,logout:true
    }
    
    
    componentDidMount()
    {
        // console.log('INventory mount')
        firebase.auth().onAuthStateChanged(user => {
            if(user)
            {
            
                this.authHandler({user});
            }
        })
    }
    
    authHandler = async authData =>
    {
        // console.log(authData);
        // 1 check in the firebase whether it has a owner or not if it is not there assign owner
        // 2 
    
        console.log(authData);
        const store = await base.fetch(this.props.storeId,{context:this});
        console.log(store);
        // console.log(store.owner);
        
        // 2 . if there is no owner save it to owner
        if(!store.owner)
        {
            await base.post(`${this.props.storeId}/owner`,{data:authData.user.uid})
        }
        
        // 3 set the owner and uid
        this.setState(
            {
                uid:authData.user.uid,
                owner:store.owner || authData.user.uid,

            });
    }
    
    authenticate = (provider) =>
    {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);        
    }

    logout = async () =>
    {
        await firebase.auth().signOut();
        this.setState({uid:null});
    }

    render()
    {
        const logout  =  <button onClick={this.logout} >Logout</button>
        //  check if they are logged in 

        if (!this.state.uid)
        {
            return (<Login  authenticate={this.authenticate}/>)
        }
       
        //  check if the current user is the owner show the edit page
        
        if (this.state.uid &&  this.state.uid !== this.state.owner)
        {
            return (   <div>
                    {logout}
                    <p>Sorry your are not owner </p>
                </div>)
        }
        else
        {
            return (
                <div>
                 {logout}
                    {Object.keys(this.props.fishes).map(
                        (key) => (
                            <EditFishForm deleteFish={this.props.deleteFish} updatefish={this.props.updatefish} 
                            index={key} key={key} fish={this.props.fishes[key]} />))}
                    <h2>Inventory Details</h2>
                    <AddFish addfish={this.props.addfish} />
                    <button onClick={this.props.loadSamples}>Load Samples</button>
                </div>    
                )
        }
    }
}

export default Inventory;
