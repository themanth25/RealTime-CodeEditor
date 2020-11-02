import React, { Component } from 'react';
import {connect} from 'react-redux';

import './App.css';
import TextEditor from './Containers/textEditior';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Landing from './Containers/Landing/Landing';

class App extends Component {
  state = {
    p: null
  }
  componentDidMount() {
    // axios.get('http://localhost:3005/').then(res => {
    //   console.log(res.data);
    //   this.setState({ p: "/" + res.data.roomName });
    // })
  }


  render() {
    let routes = (
      <Switch>
          <Route path="/" exact component={Landing} />
          <Redirect to="/" />
        </Switch>
    );
    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/editor" component={TextEditor} />
          <Route path="/" exact component={Landing} />
          <Redirect to="/" />
        </Switch>
      );
    }
    
    return (  
      <div className="App">
        {routes}
      </div>
    );
  }

}

const mapStateToProps = (state)=>{
  return{
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps,null)(withRouter(App));
