import React from 'react';
import  PropTypes    from 'prop-types';

class Header extends React.Component
{
    static propTypes = 
    {
        tagline:PropTypes.string.isRequired
    }
    render()
    {
        return (
                <header className='top'>
                    <h1> Catch 
                    <span className="ofThe">
                        <span className="of">oF</span>
                        <span className="the">The</span>
                    </span>
                     day </h1>
                    <h3 className="tagline">
                        <span>{this.props.tagline}</span>
                    </h3>
                </header>
                
            )
    }
}

export default Header;
