import React, { Component } from 'react'
import { Text , View , StyleSheet , TextInput , TouchableWithoutFeedback, Keyboard } from 'react-native'
import * as Font from "expo-font";
import { ActivityIndicator } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'

export class Friends extends Component {

    constructor(){
        super();
        this.state={
            fontsLoaded: false,
            focus: '',
            displaySearch: false,
            displayIcon: true
        }
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'HugMeTight' : require('../Fonts/HugMeTight-GzZq.ttf'),
            'Montserrat' : require('../Fonts/Montserrat-Bold.ttf'),
            KulimPark: require("../../Fonts/KulimPark-Regular.ttf")
        });
        this.setState({ fontsLoaded: true })
    }

    handleSearchSlider = () => {
        this.setState({ displaySearch: true , displayIcon: false });
        this.secondTextInput.focus();
    }

    render() {
        if(this.state.fontsLoaded){
            return (
                <View style={styles.container} >
                <View style={{backgroundColor: 'white',height: '20%', alignSelf: 'stretch', alignItems: 'stretch' , borderBottomLeftRadius: 100 , justifyContent: 'space-evenly'}}>
    <View style={{ top: '25%',
                    display: (this.state.displaySearch) ? 'flex' : 'none' }}>
    <TextInput placeholder={'Search Using Email'} ref={(input) => { this.secondTextInput = input; }} onFocus={() => this.setState({ focus: true })} onBlur={() => this.setState({ focus: false, displaySearch: false, displayIcon: true })} style={{...styles.Inputs, 
                    borderWidth: this.state.focus ? 2 : 0,
                  backgroundColor: this.state.focus
                    ? "#FFF"
                    : "rgba(211, 219, 219,0.5)",
                    zIndex: 2,
                    marginHorizontal: '10%',
                    paddingLeft: 20,
                    textAlign: 'center'
                }}
                value={this.state.username}
                autoCapitalize = 'none'
              />
    </View>
                
                
                    <View style={{ height: '30%', paddingRight: '10%', justifyContent: 'center', top: 5, alignItems: 'flex-end'}}>
                         <Icon name="ios-search" size={30} onPress={()=> this.handleSearchSlider()} style={{ display: (this.state.displayIcon) ? 'flex' : 'none' }}/>
                    </View>
                    <View style={{ height: '30%' , justifyContent: 'center', paddingHorizontal: '25%' ,}}>
                        <Text style={{ fontSize: 25, fontFamily: 'Montserrat'}}>Friends</Text>
                    </View>
                </View>                    
                </View>
            )
        }
        else{
            return <ActivityIndicator style={styles.container} size="large" /> 
            {/* <Text style={{ fontFamily: 'HugMeTight', fontSize: 20, color: '#787878' }}> SEARCH FOR NEW FRIENDS </Text> */}
        }
    }
}

export default Friends;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },
    Inputs:{
        top: 10,
      height: 50,
      borderColor: "#72e8ed",
      marginRight: 20,
      borderRadius: 10,
      fontFamily: "KulimPark",
    }
});
