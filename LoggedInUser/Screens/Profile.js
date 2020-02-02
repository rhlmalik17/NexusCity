import React, { Component } from 'react'
import { Text, View , StyleSheet, Image } from 'react-native'

export class Profile extends Component {
    constructor()
    {
        super();
    }
    render() {
        return (
            // Parent
            <View style={styles.container}>
                {/* Profile Picture */}
                <View style={styles.Profile_Picture}>
                    
                        <Image source={require('../Assets/Default_Profile.jpg')} resizeMode="contain" style={{ height: '80%', width: '80%' }} />
                    
                    
                    <View style={styles.Linear_Gradient}>
                         <Image source={require('../Assets/Linear_Gradient.png')}  resizeMode="stretch" style={{ width: '100%', }} />
                    </View>
                    
                </View>
            </View>
          )
    }
}

export default Profile;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#000',
        
    },
    Profile_Picture: {
        flex: 0.4,
        backgroundColor: '#fff',
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center'
    },
    Linear_Gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }

    
})