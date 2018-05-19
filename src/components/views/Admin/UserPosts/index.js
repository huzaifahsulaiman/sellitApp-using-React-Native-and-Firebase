import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, ScrollView, TouchableOpacity, Modal } from "react-native";
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

        this.state = {
            posts:[],
            modal:false
        }

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
        this.props.getUserPosts(UID)
    }

    componentWillReceiveProps(nextProps){
        //if data comes
        if(nextProps.User.userPosts){
            this.setState({
                posts: nextProps.User.userPosts
            })
        }
    }

    showConfirm = (ID) => {
        this.setState({
            modal:true,
            toDelete:ID
        })
    }

    showPosts=(posts)=>(
        posts ?
            posts.map(item=>(
                <View style={styles.itemWrapper} key={item.id}>
                    <View style={styles.itemTitle}>
                        <Text style={{
                            fontFamily: 'Roboto-Black'
                        }}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={styles.itemDescription}>
                        <Text>
                            {item.description}
                        </Text>
                        <View style={{marginTop:10}}>
                            <Text style={styles.small}>Price: $ {item.price}</Text>
                            <Text style={styles.small}>Price:  {item.category}</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={()=> this.showConfirm(item.id)}
                        >
                            <Text
                                style={{
                                    fontFamily:'Roboto-Black',
                                    color:'#F44336',
                                    paddingBottom:10
                                }}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modal}
                    >
                        <View style={{padding:50}}>
                                <Text style={{fontSize:20}}>
                                        Are you sure you want to delete the post?
                                </Text>
                                <View style={{marginTop:50}}>
                                    <TouchableOpacity
                                        onPress={()=> alert('yes delete it')}
                                    >
                                        <Text style={styles.modalDelete}>Yes, delete it</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                modal:false,
                                                toDelete:''
                                            })
                                        }}
                                    >
                                        <Text style={styles.modalClose}>No, keep it</Text>
                                    </TouchableOpacity>
                                </View>

                        </View>  
                    </Modal>          

                </View>
            ))
        :null
    )

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={{
                        marginBottom:30
                    }}>
                        <Text>You have {this.state.posts.length} posts</Text>
                    </View>
                    {this.showPosts(this.state.posts)}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10
    },
    itemWrapper:{
        borderWidth: 1,
        borderColor: '#ececec',
        borderRadius: 2,
        marginTop: 20
    },
    itemTitle:{
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        padding:10,
        backgroundColor:'#f5f5f5'
    },
    itemDescription:{
        padding:10
    },
    small:{
        fontSize:12
    },
    button:{
        alignItems:'center'
    },
    modalDelete:{
        marginBottom:20,
        alignSelf:'center',
        fontSize:20,
        color:'#f44336'
    },
    modalClose:{
        marginBottom: 20,
        alignSelf: 'center',
        fontSize: 20,
        color: '#00ada9'
    }

})
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
