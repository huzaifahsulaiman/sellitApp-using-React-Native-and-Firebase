import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { navigatorDrawer } from "../../../utils/misc";
import Input from "../../../utils/forms/inputs";
import ValidationRules from "../../../utils/forms/validationRules";

class AddPost extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent((event) => {
      navigatorDrawer(event, this) //this mean this class
    })
  }

  state = {
    hasErrors: false,
    form: {
      category: {
        value: "",
        name:"category",
        valid: false,
        type: "picker",
        options: ['Select a category','Sports', 'Music', 'Clothing', 'Electronics'],
        rules: {
          isRequired: true
        }
      },
    }
  }

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    //console.log(valid)
    //changing validation to true
    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{flex:1,alignItems:'center'}}>
             <Text style={styles.mainTitle}>Sell your stuff</Text> 
          </View>

          <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{ flex:1 }}>
              <Text>Select a category</Text> 
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select a category"
                type={this.state.form.category.type}
                value={this.state.form.category.value}
                onValueChange={value => this.updateInput("category", value)}
                options={this.state.form.category.options}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer:{
    flex:1,
    flexDirection:'column',
    padding:20
  },
  mainTitle:{
    fontFamily: 'Roboto-Black',
    fontSize: 30,
    color: '#00ADA9'
  }
});

export default AddPost;
