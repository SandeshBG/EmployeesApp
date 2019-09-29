/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducers} from './src/reducers/index';
import LoginScreen from './src/components/LoginScreen';
import Employees from './src/components/Employees';

const AppNavigator = createStackNavigator({
  Login : {screen: LoginScreen},
  Employees : {screen: Employees}
})

let store = createStore(reducers);

const Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}
