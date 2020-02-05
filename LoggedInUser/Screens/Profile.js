import React, { Component } from 'react'
import { Text, View , StyleSheet, Image } from 'react-native'
import * as Font from "expo-font";
import { ActivityIndicator } from 'react-native-paper';

export class Profile extends Component {
    constructor()
    {
        super();
        this.state={
            fontsLoaded: false
        }
    }
    async componentDidMount() {
        await Font.loadAsync({
          WorkSans: require("../Fonts/Work-Sans.ttf"),
        });
        await this.setState({ fontsLoaded: true });
      }
    render() {
        if(this.state.fontsLoaded)
        return (
            // Parent
            <View style={styles.container}>
                {/* Upper Flex Box */}
                <View style={styles.upperBox}>
                    <View style={styles.headingBox}>
                        <Text style={{ fontSize: 20, fontFamily: 'WorkSans' }}>MY PROFILE</Text>
                    </View>
                    <View>
                        
                    </View>
                    <View>

                    </View>
                </View>
            </View>
          )
          else
          {
              return <ActivityIndicator size="large"/>
          }
    }
}

export default Profile;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch', 
    },
    upperBox:{
        height: '50%',
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'space-around',
        
    },
    headingBox: {
        height: '15%',
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePicture: {

    },
    displayName: {

    }

})