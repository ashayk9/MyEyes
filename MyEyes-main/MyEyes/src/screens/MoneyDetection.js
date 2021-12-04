import React from "react";
import { Text,View,ScrollView,StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Tts from "react-native-tts";
import * as ImagePicker from "react-native-image-picker"
import colors from "../assets/colors"
import Icon from "react-native-vector-icons/FontAwesome5"
// import {bundleResourceIO} from "@tensorflow/tfjs-react-native"
// import * as tf from "@tensorflow/tfjs"

// model
const moneydetection_json = require("../../models/moneydetection/mobilenet.json");
// const moneydetection_model = require("C:\Users\\bhavy\Github_ML\MyEyes\MyEyes\models\moneydetection\group1-shard.bin");

export default class DocReading extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isloading:true,
            filePath:null,
            fileData:null,
            fileUri:null,
            text:null,
            model:null
        }
    }

    async componentDidMount(){
        this.setState({
            isloading:false
        });
        // const model = await tf
        // .loadLayersModel(bundleResourceIO(moneydetection_json, moneydetection_model))
        // .catch(e => console.log(e));
        console.log("Model loaded!");


//       await Tts.speak('Click on the button at the bottom of the screen to turn on camera', {
//         androidParams: {
//         KEY_PARAM_PAN: -1,
//         KEY_PARAM_VOLUME: 0.5,
//         KEY_PARAM_STREAM: 'STREAM_MUSIC',
//         language:"en-US"
//     },
//   });
        // this.setState({
        //     model:model
        // })
    }


    launchcamera = async () => {
        let options = {
            maxWidth:600,
            maxHeight:600,
            quality:0.5,
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                filePath: response,
                fileData: response.data,
                fileUri: response.uri,
              });
              this.currencydetection(response)
              
            }
          });
    }

    currencydetection = async (response) => {
        console.log(response);
        const data = new FormData();
        data.append("file",{
            name:response.fileName,
            type:response.type,
            uri:response.uri
        });

        await fetch("http://192.168.0.125:5000/currencydetection",{
            method:"POST",
            headers:{
                "Content-Type":"multipart/form-data"
            },
            body:data,
        })
        .then((apiresponse) => apiresponse.json())
        .then(currencyresponse => {
            if(currencyresponse.success == true){
                console.log(currencyresponse);
                this.setState({
                  text:currencyresponse.prediction
                })
            this.readoutresponse(currencyresponse.prediction)                
            }
        })
        .catch(e => console.log(e))
    }

    readoutresponse = async (prediction) => {
        await Tts.speak(prediction, {
            androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
            language:"en-US"
            },
            });
    }


    render(){
        if(this.state.isloading){
            return(
                <View style={{justifyContent:"center",flex:1}}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }

        else{
            return(
                <View style={styles.container}>
                    <View style={{alignSelf:"center"}}>
                        {this.state.text?
                            <View>
                                <Text style={{fontWeight:"600",fontSize:30}}>{this.state.text}</Text>
                            </View> 
                            :
                            <View>
                            <Text style={{fontWeight:"600",fontSize:30}}>No Currency Detected</Text>
                            </View>
                        }
                    </View>
                    <View>
                    <TouchableOpacity style={styles.bottombutton} onPress={this.launchcamera}> 
                        <Icon name="camera" size={30} style={{paddingRight:10}} />
                        <Text style={{fontSize:20}}>Camera</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
    },
    bottombutton:{
        height:60,
        flexDirection:"row",
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
    }
})