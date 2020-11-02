import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import InputElement from '../../Components/UI/Input/Input';
import classes from './AuthForm.module.css';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        showLogin: true,
        signupForm: {
            name: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 3
                },
            },
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                }
            },
            confpassword: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
            },
        },
        loginForm: {
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                },
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
            },
        },
        error: null

    }

    signinInputChangedHandler = (event, inputName) => {
        const updatedForm = {
            ...this.state.signupForm,
            [inputName]: {
                ...this.state.signupForm[inputName],
                value: event.target.value,
                touched: true,
            }
        }
        this.setState({ signupForm: updatedForm });
    }

    loginInputChangeHandler = (event, inputName) => {
        const updatedForm = {
            ...this.state.loginForm,
            [inputName]: {
                ...this.state.loginForm[inputName],
                value: event.target.value,
                touched: true,
            }
        }
        this.setState({ loginForm: updatedForm });
    }


    formShowHandler = () => {
        this.setState((state, props) => ({
            showLogin: !state.showLogin
        }))
        this.props.onErrorCleanUp();
    }


    formSubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.showLogin) {
            this.props.onLogin(this.state.loginForm.email.value, this.state.loginForm.password.value);
        }
        else {
            const name = this.state.signupForm.name.value;
            const email = this.state.signupForm.email.value;
            const password = this.state.signupForm.password.value;
            const confpass = this.state.signupForm.confpassword.value;
            if (password === confpass) {
                this.setState({ error: null });
                this.props.onSignUp(name, email, password);
            }
            else {
                this.setState({ error: "Password and Confirm Password Should be Same" });
            }

        }
    }

    render() {

        let form;
        if (!this.state.showLogin) {
            const formElementArray = [];
            for (let key in this.state.signupForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.signupForm[key]
                });
            }
            form = formElementArray.map(el => (
                <InputElement
                    key={el.id}
                    elementConfig={el.config.elementConfig}
                    name={el.id}
                    changed={(event) => this.signinInputChangedHandler(event, el.id)}
                    minLength={el.config.validation.minLength}
                />
            ))
        }
        else {
            const formElementArray = [];
            for (let key in this.state.loginForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.loginForm[key]
                });
            }
            form = formElementArray.map(el => (
                <InputElement
                    key={el.id}
                    elementConfig={el.config.elementConfig}
                    name={el.id}
                    changed={(event) => this.loginInputChangeHandler(event, el.id)}
                    minLength={el.config.validation.minLength}
                />
            ))
        }
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.FormContainer}>
                <form onSubmit={(event) => this.formSubmitHandler(event)}>
                    <h1 style={{ marginBottom: "10px" }}>{this.state.showLogin ? 'Login' : 'Signup'}</h1>
                    <hr />
                    <br />
                    {form}
                    <p className={classes.ErrorMsg}>{this.props.error}</p>
                    <button className={classes.SubBtn} type="submit">{this.state.showLogin ? 'Login' : 'Signup'}</button>

                </form>
                <p className={classes.SwitchMsg}>{this.state.showLogin ? "Don't Have a Account ?" : "Already have an Account ?"}</p>
                {this.state.showLogin ? <button className={classes.switchBtn} onClick={this.formShowHandler}>Signup</button> : <button className={classes.switchBtn} onClick={this.formShowHandler}>Login</button>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.startLogin(email, password)),
        onSignUp: (name, email, password) => dispatch(actions.postSignUp(name, email, password)),
        onErrorCleanUp: () => dispatch(actions.errorCleanUp())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);