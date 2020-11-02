import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import CoverImage from '../../Components/Landing/CoverImage';
import AuthForm from '../Auth/AuthForm';
import classes from './Landing.module.css';

class Landing extends Component {
    state = {
        formData: null
    }
    componentDidMount() {
        console.log(this.props.history);
    }
    changeHandler = (event) => {
        this.setState({ formData: event.target.value });
    }
    formHandler = (event) => {
        event.preventDefault();
        this.props.onJoinRoom(this.state.formData);
        this.props.history.push('/editor');
    }
    clickHandel = () => {
        if (this.props.roomName === null) {
            const roomName = Math.round((Math.pow(36, 6 + 1) - Math.random() * Math.pow(36, 6))).toString(36).slice(1);
            this.props.onJoinRoom(roomName);
        }
        this.props.history.push('/editor');
    }

    render() {
        let form = <AuthForm />
        if (this.props.isAuth) {
            form = (
                <React.Fragment>
                    <form className={classes.JoinForm} onSubmit={this.formHandler}>
                        <h1>A Real Time Code Editor</h1>
                        <p>for Collabrative Development</p>
                        <br />
                        <input type="text" required minLength="6" maxLength="6" placeholder="Enter Join ID" onChange={(event) => this.changeHandler(event)} name="roomName" />
                        <button type="submit">Join Editor</button>
                    </form>
                    <button className={classes.ShareBtn} onClick={this.clickHandel}>Share Editor</button>
                </React.Fragment>
            );
        }
        return (
            <div className={classes.MainContainer}>
                {this.props.isAuth ? <button className={classes.LogoutBtn} onClick={()=>this.props.onLogout()}>Logout</button> : null}
                <h1 className={classes.MainHeading}>{'</>'} CODE SHARING</h1>
                <CoverImage />
                
                <div className={classes.LandingContainer}>
                {form}
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        roomName: state.editor.roomName,
        isAuth: state.auth.isAuth,
        userName : state.auth.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onJoinRoom: (name) => dispatch(actions.getRoomName(name)),
        onLogout: ()=> dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);