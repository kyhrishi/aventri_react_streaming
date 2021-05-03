import React from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'233953607131-sfuapd78ouve2i8hsti1814icseq8dsk.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        console.log(isSignedIn);
        if( isSignedIn ){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    authButtonClick = () => {
        this.props.isSignedIn ? this.auth.signOut() : this.auth.signIn();
    }
    
    renderAuthButton(){
        if (this.props.isSignedIn) {
            return (
                <button className="ui button green google" onClick={this.authButtonClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui button red google" onClick={this.authButtonClick}>
                    <i className="google icon"/>
                    Sign In
                </button>
            )
        } 
    }
    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        )
    } 
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)