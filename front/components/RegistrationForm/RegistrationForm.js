import React, { Component } from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.login = React.createRef();
        this.password = React.createRef();
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler() {
        const login = this.login.value;
        const password = this.password.value;
        const data = JSON.stringify({ login: login, password: password });

        fetch('api/registration/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    }

    render() {
        return (
            <div className='registration-form'>
                <input ref={this.login} type='text' />
                <input ref={this.password} type='text' />
                <button onClick={this.submitHandler}>Submit</button>
            </div>
        );
    }
}

export default RegistrationForm;