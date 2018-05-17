import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { navigatorDrawer, navigatorDeepLink } from '../../utils/misc';
import HorizontalScroll from './horizontal_scroll_icons';
import { connect } from 'react-redux';
import { getArticles } from '../../Store/actions/articles_action';
import { bindActionCreators } from 'redux';


class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            categories:['All', 'Sports', 'Music', 'Clothing', 'Electronics'],
            categorySelected:"All"
        }

        this.props.navigator.setOnNavigatorEvent((event)=>{
            navigatorDeepLink(event, this)
            navigatorDrawer(event, this) //this mean this class
        })
    }

    updateCategoryHandler = (value) => (
        this.setState({
            categorySelected:value
        })
    )

    componentDidMount(){
        this.props.getArticles('All').then(()=>{
            console.log(this.props.Articles.list)
        })
    }

    render() {
        return (
            <ScrollView>
                
                <View style={styles.container}>
                    <HorizontalScroll
                        categories={this.state.categories}
                        categorySelected={this.state.categorySelected}
                        updateCategoryHandler={this.updateCategoryHandler}
                    />
                </View>
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:5,
    }
});

function mapStateToProps(state){
    console.log(state)
    return {
        Articles: state.Article
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getArticles},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);
