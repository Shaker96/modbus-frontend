import React from 'react';

class Login extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.inputValues = {
            email: "",
            password: ""
        };
    }

    onChange({ name, value }) {
        this.inputValues[name] = value;
        console.log(this.inputValues);
    }

    render() {
        console.log('LOGIN');

        return (
            <h1>Login</h1>
        );
    }
}

export default Login;