// компонент выхода с авторизации и обнуления сессии
import React, {Component} from 'react'
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";
// редирект
import {Redirect} from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        // компонент редирект
        return <Redirect to={'/'}/>
    }

}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}
export default connect(null, mapDispatchToProps)(Logout)