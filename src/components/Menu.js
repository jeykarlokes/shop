import React from 'react';
import PropTypes from 'prop-types';

import Fish from './Fish';

class Menu extends React.Component
{
    static propTypes = 
    {
        fishes:PropTypes.object,
        addtocart:PropTypes.func
    }

    render()
    {
    const fishes = this.props.fishes;
        return (
            <div className="menu">
                <h1>Menu</h1>
                {Object.keys(fishes).map((name) =>
                <Fish key={name} index={name} addtocart={this.props.addtocart} 
                fish={fishes[name]}/>)
                }
            </div>
            )
    }
}

export default Menu;
