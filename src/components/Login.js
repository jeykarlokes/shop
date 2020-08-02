import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) =>
(
    <nav className="login">
        <h2>Inventory Login </h2>
        <button className="github" onClick={() => props.authenticate('Github')} >Login in With Github</button>
        <button className="facebook" onClick={() => props.authenticate('Facebook')} >Login in With Facebook</button>
        <button className="twitter" onClick={() => props.authenticate('Twitter')} >Login in With Twitter</button>
    </nav>
)

Login.propTypes = {
    authenticate:PropTypes.func.isRequired
};

export default Login;
