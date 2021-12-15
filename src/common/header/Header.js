import React, {Component, useState} from 'react';
import './Header.css';
import Logo from '../../assets/logo.svg'
import {Button, Tabs, Tab, FormControl, InputLabel, Input, TextField} from '@material-ui/core';
import Modal from "react-modal";

const LoginTab = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError(!e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(!e.target.value);
    };
    const onLogin = () => {
        if (username && password) {
            props.onLogin();
        }
    }
    return (
        <div className={"login-form-wrapper"}>
            <FormControl style={{width: 200}}>
                <TextField onChange={onUsernameChange}
                           value={username}
                           variant={"standard"}
                           label={"Username *"}
                           id={"login-username"}
                           error={usernameError}
                           helperText={usernameError ? "required" : ''}
                />
            </FormControl>
            <FormControl style={{width: 200}}>
                <TextField onChange={onPasswordChange}
                           value={password}
                           variant={"standard"}
                           label={"Password *"}
                           id={"login-password"}
                           error={passwordError}
                           helperText={passwordError ? "required" : ''}
                />
            </FormControl>
            <Button onClick={onLogin} variant={"contained"} color={"primary"}>Login</Button>
        </div>
    );
}

const RegisterTab = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [contactError, setContactError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setFirstNameError(!e.target.value);
    };
    const onLastNameChange = (e) => {
        setLastName(e.target.value);
        setLastNameError(!e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(!e.target.value);
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(!e.target.value);
    };
    const onContactChange = (e) => {
        setContact(e.target.value);
        setContactError(!e.target.value);
    };
    const onRegister = () => {
        if (!firstNameError && !lastNameError && !emailError && !passwordError && !contactError) {
            // fetch('http://localhost:8085/api/v1/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*',
            //     },
            //     body: JSON.stringify({
            //         "email_address": email,
            //         "first_name": firstName,
            //         "last_name": lastName,
            //         "mobile_number": contact,
            //         "password": password,
            //     }),
            // })
            //     .then(resp => resp.json())
            //     .then(data => console.log(data))
            //     .catch(err => err)
        }
    }
    return (
        <div className={"register-form-wrapper"}>
            <FormControl style={{width: 200}}>
                <TextField onChange={onFirstNameChange}
                           value={firstName}
                           variant={"standard"}
                           label={"First Name *"}
                           id={"register-firstname"}
                           error={firstNameError}
                           helperText={firstNameError ? "required" : ''}
                />
            </FormControl>
            <FormControl style={{width: 200}}>
                <TextField onChange={onLastNameChange}
                           value={lastName}
                           variant={"standard"}
                           label={"Last Name *"}
                           id={"register-lastname"}
                           error={lastNameError}
                           helperText={lastNameError ? "required" : ''}
                />
            </FormControl>
            <FormControl style={{width: 200}}>
                <TextField onChange={onEmailChange}
                           value={email}
                           variant={"standard"}
                           label={"Email *"}
                           id={"register-email"}
                           error={emailError}
                           helperText={emailError ? "required" : ''}
                />
            </FormControl>
            <FormControl style={{width: 200}}>
                <TextField onChange={onPasswordChange}
                           value={password}
                           variant={"standard"}
                           type={"password"}
                           label={"Password *"}
                           id={"register-password"}
                           error={passwordError}
                           helperText={passwordError ? "required" : ''}
                />
            </FormControl>
            <FormControl style={{width: 200}}>
                <TextField onChange={onContactChange}
                           value={contact}
                           variant={"standard"}
                           label={"Contact No. *"}
                           id={"register-contact"}
                           error={contactError}
                           helperText={contactError ? "required" : ''}
                />
            </FormControl>
            <Button onClick={onRegister} variant={"contained"} color={"primary"}>Register</Button>
        </div>
    );
}

const TabPane = (props) => {
    const {value} = props;
    switch (value) {
        case 'login': {
            return <LoginTab {...props}/>;
        }
        case 'register': {
            return <RegisterTab {...props}/>;
        }
        default: {
            return <div></div>;
        }
    }
}

const LoginRegisterModal = (props) => {
    const {modalIsOpen, closeModal} = props;
    const [tab, selectTab] = useState('login');
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    width: '300px',
                    height: '450px',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }
            }}
        >
            <Tabs value={tab} onChange={(e, tabKey) => selectTab(tabKey)}>
                <Tab style={{flex: 1}} value={'login'} label="Login"/>
                <Tab style={{flex: 1}} value={'register'} label="Register"/>
            </Tabs>
            <TabPane value={tab} {...props}/>
        </Modal>
    );
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        }
        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        // this.onBookShowClick = this.onBookShowClick.bind(this);
    }

    getLoggedIn() {
        return Boolean(localStorage.getItem('loggedIn')); // TODO: this is temporary until API implementation
    }

    setLoggedIn(value) {
        localStorage.setItem('loggedIn', value); // TODO: this is temporary until API implementation
    }

    openLoginModal() {
        this.setState({modalIsOpen: true});
    }

    closeLoginModal() {
        this.setState({modalIsOpen: false});
    }

    onLogin() {
        this.closeLoginModal();
        this.setLoggedIn('true');
    }

    onLogout() {
        this.setLoggedIn('');
        this.forceUpdate();
    }

    onBookShowClick() {
        const isLoggedIn = this.getLoggedIn();
        if (!isLoggedIn) {
            this.openLoginModal();
        } else {
                this.props.history.push(`/bookshow/${this.props.bookShowId}`);
        }
    }

    render() {
        const {modalIsOpen} = this.state;
        const {showBookShow} = this.props;
        const isLoggedIn = this.getLoggedIn();
        return (
            <div className={"header-container"}>
                <img src={Logo} className={"header-logo"}/>
                <div>
                    {
                        !isLoggedIn ?
                            <Button onClick={this.openLoginModal} variant={"contained"}
                                    color={"default"}>Login</Button> :
                            <Button onClick={this.onLogout} variant={"contained"} color={"default"}>Logout</Button>
                    }
                    {
                        showBookShow &&
                        <Button onClick={() => this.onBookShowClick()} variant={"contained"} color={"primary"} style={{marginLeft: '15px'}}>
                            Book Show
                        </Button>
                    }
                </div>
                <LoginRegisterModal modalIsOpen={modalIsOpen} onLogin={this.onLogin} closeModal={this.closeLoginModal}/>
            </div>
        );
    }
}

export default Header;