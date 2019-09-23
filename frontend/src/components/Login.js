import React, { Component } from 'react';
import axios from 'axios';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = async e => {
        e.preventDefault();
        const { data } = await axios.post('/login', { ...this.state });
        if (data.success) {
            this.props.updateUserState();
            this.props.history.push('/');
        } else if (data.flashMessage && data.flashMessage.length) {
            alert(data.flashMessage.join('\n'));
        } else {
            alert('An unknow error occured!');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 text-center">
                    <form className="form-signin" onSubmit={this.submitHandler}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input type="email" name="email" id="email" className="form-control" placeholder="Email address" value={this.state.email} onChange={this.changeHandler} required autoFocus />

                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" name="password" id="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeHandler} required />

                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;