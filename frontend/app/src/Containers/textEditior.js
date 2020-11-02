import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import classes from './textEditor.module.css';
import Editor from '../Components/Editor/Editor';
import SideDrawer from '../Components/UI/sideDrawer/sideDrawer';
import * as actions from '../store/actions/index';
import DrawerChlid from '../Components/UI/sideDrawer/DrawerChild';

const socket = io('http://localhost:3005/');
class TextEditor extends Component {
    state = {
        code: "//write you code here..",
        language: "plaintext",
        editorWidth: "100%",
        room: "testRoom",
        drawerOpen: false,
        editorTheme: "vs-dark",
        fontSize: 14,
    }

    componentDidMount() {
        console.log("editor component");
        socket.emit('join', this.props.roomName);
        socket.on('chat', msg => {
            this.setState({ code: msg });
        })
    }

    componentDidUpdate() {
        // socket.on("updateEd",data=>{
        //     // console.log(data);
        //     this.setState({code: data});
        // })
    }
    editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', this.props.roomName);
        // editor.focus();
    }

    onChange = (newValue, e) => {
        // console.log('onChange', e);
        this.setState({ code: e });
        socket.emit('chat', { message: this.state.code, room: this.props.roomName });
    }


    onDrawerOpen = () => {
        this.setState({ editorWidth: "80%", drawerOpen: true });
    }

    onDrawerClose = () => {
        this.setState({ editorWidth: "96%", drawerOpen: false });
    }

    onThemeChange = (event) => {
        this.setState({ editorTheme: event.target.value })
    }

    onFontChange = (event) => {
        this.setState({ fontSize: event.target.value })
    }

    onLanguageChange = (event)=>{
        this.setState({language: event.target.value})
    }

    goToHomeHandler = ()=>{
        this.props.history.push("/");
    }

    render() {
        return (
            <div className={classes.Main}>
                <span className={classes.RoomId}>Room Id :- {this.props.roomName}</span>
                <button className={classes.HomeBtn} onClick={() => this.goToHomeHandler()}>Home</button>
                <button className={classes.LogoutBtn} onClick={() => this.props.onLogout()}>Logout</button>
                <select onChange={(event) => this.onThemeChange(event)}>
                    <option value="vs-dark">Dark</option>
                    <option value="vs-light">Light</option>
                </select>
                <select onChange={(event) => this.onFontChange(event)}>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="24">24</option>
                </select>
                <select onChange={(event) => this.onLanguageChange(event)}>
                    <option value="plaintext">Plain Text</option>
                    <option value="javascript">JavaScript</option>
                    <option value="json">JSON</option>
                    <option value="sql">SQL</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="xml">xml</option>
                </select>

                <Editor
                    code={this.state.code}
                    change={this.onChange}
                    editorMount={this.editorDidMount}
                    editorWidth={this.state.editorWidth}
                    theme={this.state.editorTheme}
                    fontSize={this.state.fontSize}
                    language={this.state.language}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        roomName: state.editor.roomName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);