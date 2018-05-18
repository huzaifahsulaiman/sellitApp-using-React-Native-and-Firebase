import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { navigatorDrawer } from "../../../utils/misc";
import Input from "../../../utils/forms/inputs";
import ValidationRules from "../../../utils/forms/validationRules";

class AddPost extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this); //this mean this class
    });
  }

  state = {
    loading:false,
    hasErrors: false,
    form: {
      category: {
        value: "",
        name: "category",
        valid: false,
        type: "picker",
        options: [
          "Select a category",
          "Sports",
          "Music",
          "Clothing",
          "Electronics"
        ],
        rules: {
          isRequired: true
        }
      },
      title: {
        value: "",
        name: "title",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 50
        }
      },
      description: {
        value: "",
        name: "description",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          maxLength: 200
        }
      },
      price: {
        value: "",
        name: "description",
        valid: false,
        type: "textinput",
        rules:{
          isRequired:true,
          maxLength:6
        }
      },
      email: {
        value: "",
        name:"email",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        }
      }
    }
  };

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

  submitFormHandler = () => {
    let isFormValid = true;
    let dataToSubmit = {};
    const formCopy = this.state.form;

    for(let key in formCopy){
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key]= this.state.form[key].value;
    }

    if(isFormValid){
      console.log(dataToSubmit)
    }else{
      console.log("has errors");
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.mainTitle}>Sell your stuff</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
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
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.secondTitle}>
              Describe what you are selling
            </Text>
          </View>

          <View>
            <Text>Please add the title</Text>
            <Input
              placeholder="Enter a title"
              type={this.state.form.title.type}
              value={this.state.form.title.value}
              onChangeText={value => this.updateInput("title", value)}
              overrideStyle={styles.inputText}
            />
          </View>

          <View>
            <Input
              placeholder="Enter the description"
              type={this.state.form.description.type}
              value={this.state.form.description.value}
              onChangeText={value => this.updateInput("description", value)}
              multiline={true}
              numberOfLines={4}
              overrideStyle={styles.inputTextMultiline}
            />
          </View>

          <View>
            <Text 
              style={{
                marginTop:20,
                marginBottom:20
              }}
            >How much is the item?
            </Text>
            <Input
              placeholder="Enter the price"
              type={this.state.form.price.type}
              value={this.state.form.price.value}
              onChangeText={value => this.updateInput("price", value)}
              overrideStyle={styles.inputText}
              keyboardType={"numeric"}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.secondTitle}>
              Add your contact data
            </Text>
          </View>
          <View>
            <Text>
              Please enter the email where buyer can contact
            </Text>
            <Input
              placeholder="Enter your email"
              type={this.state.form.email.type}
              value={this.state.form.email.value}
              onChangeText={value => this.updateInput("email", value)}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
              overrideStyle={styles.inputText}
            />
          </View>
          {
            !this.state.loading ?
              <Button
                title={"Sell it"}
                color="lightgrey"
                onPress={this.submitFormHandler}
              />
            :null
          }
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
  },
  secondTitle:{
    fontFamily:'Roboto-Black',
    fontSize:20,
    color:'#00ADA9',
    marginTop:30,
    marginBottom:30
  },
  inputText:{
    backgroundColor:'#F2F2F2',
    borderBottomWidth:0,
    padding:10
  },
  inputTextMultiline:{
    backgroundColor: '#F2F2F2',
    borderBottomWidth: 0,
    padding: 10,
    minHeight:100
  }
});

export default AddPost;
