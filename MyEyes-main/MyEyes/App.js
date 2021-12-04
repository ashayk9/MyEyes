/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation"
import {
  StyleSheet,
  Text
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//screens import 
import Home from "./src/screens/Home.js";
import ModelOutput from './src/screens/ModelOutput.js';
import DocReading from "./src/screens/DocReading.js"
import MoneyDetection from "./src/screens/MoneyDetection.js"

const stacknavigator = createStackNavigator({
  MyEyes:{
    screen:Home,
    navigationOptions:{
    }
  },
  ModelOutput:{
    screen:ModelOutput
  },
  DocumentReading:{
    screen:DocReading,
    navigationOptions:{
      title:"Document Reading"
    }
  },
  MoneyDetection:{
    screen:MoneyDetection
  }
})

const AppContainer = createAppContainer(stacknavigator);

class App extends React.Component {
  render(){
    return(
      <AppContainer></AppContainer>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
