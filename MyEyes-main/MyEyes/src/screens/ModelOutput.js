import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import Tts from 'react-native-tts';

export class ModelOutput extends Component {


    gotohome = () => {
        console.log('inside gothome');
        this.props.navigation.navigate("MyEyes");
    }
    render() {
        return (
            <View>
                <Text> ModelOutput Screen </Text>
                <TouchableOpacity onPress={this.gotohome}>
                    <Text>To Home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ModelOutput

