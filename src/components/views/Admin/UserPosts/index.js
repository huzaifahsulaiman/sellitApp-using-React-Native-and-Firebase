import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { connect } from 'react-redux';
import { getUserPosts } from '../../../Store/actions/user_actions'
import { bindActionCreators } from 'redux';
import { map } from "rsvp";

class UserPosts extends Component {

    static navigatorButtons = {
        leftButtons: Platform.OS === 'ios'
        ? [
            {
                title:'Go back',
                id:'goBack'
            }
        ]
        :null
    }

    constructor(props){
        super(props);

        if(Platform.OS === 'ios'){
            this.props.navigator.setOnNavigatorEvent((event)=>{
                if(event.id === 'goBack'){
                    this.props.navigator.dismissAllModals({
                        animationType:'slide-down'
                    })
                }
            })
        }
    }

    componentDidMount(){
        const UID = this.props.User.userData.uid;
        this.props.getUserPosts(UID);
    }

    render(){
        return(
            <Text> USER POSTS </Text>
        )
    }
}
function mapStateToProps(state){
    console.log(state);
  return{
      User:state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getUserPosts},dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(UserPosts);
