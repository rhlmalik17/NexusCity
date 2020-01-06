import React, { Component } from "react";
import { Text, View, TouchableNativeFeedback, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { signInUser } from '../Credentials/ManageUsers';
export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      borderWidth: 2,
      focus: false,
      focus2: false,
      isHidden: true,
      fontsLoaded: false,
      username: '',
      password: '',
    };
    
  }
  checkAndLogin()
  {
    if((this.state.username && this.state.password))
    {
    signInUser(this.state.username,this.state.password,this);
     
    }
    else
    {
      alert('Enter all the fields');
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      KulimPark: require("../Fonts/KulimPark-Regular.ttf")
    });
    await this.setState({ fontsLoaded: true });
  }
  render() {
    if(!this.state.fontsLoaded)
    {
      return <ActivityIndicator size="large"/>
    }
    else {
    return (
      <View style={styles.container}>
        <View style={styles.ParentBox}>
          <View style={styles.Heading}>
            <Text style={styles.TextStylings}>Log In</Text>
          </View>
          <View style={styles.InputParent}>
            <View>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Username
              </Text>

              <TextInput
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}
                style={{
                  ...styles.Inputs,
                  borderWidth: this.state.focus ? this.state.borderWidth : 0,
                  backgroundColor: this.state.focus
                    ? "#FFF"
                    : "rgba(211, 219, 219,0.5)"
                }}
                value={this.state.username}
                onChangeText={(text)=> this.setState({ username: text })}
                autoCapitalize = 'none'
              />
            </View>
            <View style={{ top: 30 }}>
              <Text style={{ ...styles.TextStylings, fontSize: 15 }}>
                Password
              </Text>
              <View>
                <View
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    left: 360,
                    top: 15,
                    height: 40,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.state.isHidden
                        ? this.setState({ isHidden: false })
                        : this.setState({ isHidden: true });
                    }}
                  >
                    <Icon
                      name={this.state.isHidden ? "eye" : "eye-slash"}
                      size={25}
                      color={"#313332"}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  onFocus={() => this.setState({ focus2: true })}
                  onBlur={() => this.setState({ focus2: false })}
                  style={{
                    ...styles.Inputs,
                    borderWidth: this.state.focus2 ? this.state.borderWidth : 0,
                    backgroundColor: this.state.focus2
                      ? "#FFF"
                      : "rgba(211, 219, 219,0.5)"
                  }}
                  secureTextEntry={this.state.isHidden ? true : false}
                  value={this.state.password}
                onChangeText={(text)=> this.setState({ password: text })}
                autoCapitalize='none'
                />
              </View>
            </View>
          </View>
          <View style={styles.ButtonBox}>
            <TouchableOpacity>
              <Text style={{...styles.TextStylings, fontSize: 15, margin: 5,color: '#12b0b5'}}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple()} onPress={()=> this.checkAndLogin()}>
                  <View style={(this.state.username && this.state.password) ? styles.Buttons : styles.DisableButton}>
                    <Text style={{...styles.TextStylings, fontSize: 15, color: 'white'}}>Log In</Text>
                  </View>
            </TouchableNativeFeedback>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUpScreen')}>
              <Text style={{...styles.TextStylings, fontSize: 15, marginTop: 25,color: '#12b0b5', alignSelf: 'center'}}>New Here? Register Here!</Text>
            </TouchableOpacity>
                  
          </View>
        </View>
      </View>
    );}
  }
}

export default LogIn;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  Heading: {
    alignItems: "center"
  },
  InputParent: {
    height: 100,
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  Buttons: {
    height: 30,
    backgroundColor: '#16dae0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5
  },
  ParentBox: {
    top: 50,
    height: 300,
    margin: 20,
    justifyContent: "space-between"
  },
  TextStylings: {
    fontSize: 25,
    color: "#141413",
    fontFamily: "KulimPark"
  },
  Inputs: {
    top: 10,
    height: 50,
    borderColor: "#72e8ed",
    marginRight: 20,
    borderRadius: 10,
    paddingLeft: 20,
    fontFamily: "KulimPark"
  },
  ButtonBox: {
    top: 100,
    backgroundColor: '',
    height: 150,
    marginRight: 20,
    alignItems: 'stretch'
  },
  DisableButton: {
    height: 30,
    backgroundColor: 'rgba(211, 219, 219,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5
  }
};
