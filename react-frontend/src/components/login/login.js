import React, { Component } from 'react'

import './login.css';

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            show: 'none',
            username: "",
            password: "",
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        let modal = document.getElementById('loginModal');
        modal.classList.toggle('modal-slide')
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.closeLogin();
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.show) {
            return {
                show: props.show,
            }
        }
        return null;
    }

    handleClose = () => {
        this.props.closeLogin();
    }


    login = async (event) => {
        event.nativeEvent.preventDefault();
        await fetch('/login', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
            })
        }).then(function (response) {
            return response.text();
        }).then(text => {
            console.log('zalogowany');
        }).catch(error => console.log(error))
    }

    onUserNameChange = (data) => {
        this.setState({
            username: data.target.value,
        });
    }

    onPasswordChange = (data) => {
        this.setState({
            password: data.target.value,
        });
    }

    render() {
        return (
            <div id="loginModal" className="modal" style={{ display: this.state.show }}>
                <div id="loginModal" className="modal-content" ref={this.wrapperRef}>
                    <div class="col-md-8 offset-md-2">
                        <div class="login-form">
                            <h1>Zaloguj się</h1>
                            <form >
                            <div class="form-group">
                                    <label for="InputUserName">Nazwa użytkownika</label>
                                    <input type="username" class="form-control" id="InputUserName" aria-describedby="usernameHelp" placeholder="Nazwa użytkownika" />
                                </div>
                                <div class="form-group">
                                    <label for="InputPassword">Hasło</label>
                                    <input type="password" class="form-control" id="InputPassword" placeholder="Hasło" />
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
