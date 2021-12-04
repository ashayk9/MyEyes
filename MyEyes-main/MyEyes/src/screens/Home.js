import React from "react";
import { Text,TouchableOpacity,View,ScrollView, FlatList,StyleSheet, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import colors from "../assets/colors";


export default class Home extends React.Component {
    constructor(props){
        super(props);
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        // Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        this.state={
            recognized: '',
            started: '',
            results: [],
            activatevoice:true,
            isloading:true
        }
    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
      }

      componentDidMount(){
          this.setState({
              isloading:false
          })
          Tts.speak('Welcome To MyEyes!', {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
              language:"en-US",
            },
          });
      }


    onSpeechStart = (e) => {
        console.log(e.value);
      }

      onSpeechEnd = (e) => {
        console.log(e);
        // Tts.speak('If you wish to speak again then activate voice command again!', {
        //     androidParams: {
        //       KEY_PARAM_PAN: -1,
        //       KEY_PARAM_VOLUME: 0.5,
        //       KEY_PARAM_STREAM: 'STREAM_MUSIC',
        //       language:"en-US",
        //     },
        //   });
        this.navigatethruspeech(e)
      }

      navigatethruspeech = (e) => {
        for(let i=0;i<e.length;i++){
            console.log("Inside for loop")
            if(e[i].toLowerCase.trim == "moneydetection"){
                console.log("Reached 1")
                this.props.navigation.navigate("Money Detection")
            }
            if(e[i].toLowerCase.trim == "documentreading"){
                console.log("Reached 2")
                this.props.navigation.navigate("Document Reading")
            }
            if(e[i].toLowerCase.trim == "colordetection"){
                console.log("Reached 3")
                this.props.navigation.navigate("Document Reading")
            }
      }
        console.log("hi")
        this.setState({
            activatevoice:!this.state.activatevoice
        })
      }


    onSpeechResults = (e) =>  {
        console.log(e.value)
        console.log("1")
        this.setState({
          results: e.value,
        });
    }

     _startRecognition = async (e) => {
        console.log("recognizing speech")
        await Tts.speak('Please speak now', {
                androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 0.5,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
                language:"en-US"
            },
          });
        this.setState({
          recognized: '',
          started: '',
          results: [],
          activatevoice:false
        });
        try {
          await Voice.start('en-US');
          console.log("yes")
        } catch (e) {
          console.error(e);
        }
      }

    stoprecognition =  async () => {
        this.setState({
            activatevoice:true
        });
        console.log("Recognition stopped");
        try {
            await Voice.stop();
        } catch (error) {
            console.log(error);
        }
    }

    render(){
        if(this.state.isloading){
            return(
                <View>
                    <ActivityIndicator size="large" color="#fccb45"></ActivityIndicator>
                </View>
            )
        }
        return(
            <View style={{flex:1,flexDirection:"column",justifyContent:"space-between"}}>
                <View>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("MoneyDetection")}}>
                        <Text style={styles.textsize}>Money Detection</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("DocumentReading")}}>
                        <Text style={styles.textsize}>Document Reading</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("ModelOutput")}}>
                        <Text style={styles.textsize}>Color Detection</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => {this.props.navigation.navigate("ModelOutput")}}>
                        <Text style={styles.textsize}>Money Detection</Text>
                        <Icon name="angle-right" size={30} color="black" />
                    </TouchableOpacity>
                    {
                        this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
                    )}
                </View>
                {
                    this.state.activatevoice?
                    <View>
                        <TouchableOpacity style={styles.buttonbottom} onPress={this._startRecognition.bind(this)}>
                            <Text style={{fontSize:20}}>Activate Voice Command</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <TouchableOpacity style={styles.buttonbottom} onPress={this.stoprecognition.bind()}>
                            <Text style={{fontSize:20}}>DeActivate Voice Command</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box:{
        flexDirection:"row",
        height:50,
        alignContent:"center",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"#d1cfc5",
        paddingHorizontal:10,
        borderBottomWidth:1,
    },
    textsize:{
        fontSize:20
    },
    buttonbottom:{
        bottom:0,
        alignItems:"center",
        height:40,
        backgroundColor:colors.bottomcolor.backgroundColor,
        alignContent:"center",
        justifyContent:"center"
    }
})