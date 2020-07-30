// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import db from './config';
import firebase from 'firebase';

function HomeScreen() {
  return (
    <KeyboardAvoidingView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Baa Baa Black Sheep Have You Any Wool?</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
function SubmitStory() {
  db.collection('Stories')
    .doc(this.state.scannedStoriesId)
    .update({
      title: firebase.firestore.FieldValue.increment(1),
      date: firebase.firestore.FieldValue.increment(1),
      storyText: firebase.firestore.FieldValue.increment(1),
    });
  ToastAndroid.show('Your Story Has Been Submitted', ToastAndroid.SHORT);
}

function SettingsScreen() {
  return (
    <FlatList    
      <KeyboardAvoidingView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Story: </Text>
          <TextInput style={{ borderRadius: 50, backgroundColor: 'Blue' }} />
          <Text>Author: </Text>
          <TextInput style={{ borderRadius: 50, backgroundColor: 'Blue' }} />
          <Text>Date: </Text>
          <TextInput style={{ borderRadius: 50, backgroundColor: 'Blue' }} />
          <TouchableOpacity
            style={{ borderRadius: 100, backgroundColor: 'Blue' }}
            onPress={this.SubmitStory}>
            <Text>Submit</Text>
          </TouchableOpacity>
          />
        </View>
      </KeyboardAvoidingView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Story') {
              iconName = focused
                ? 'ios-information-circe'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Write') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          inactiveTintColor: 'grey',
        }}>
        <Tab.Screen name="Story" component={HomeScreen} />
        <Tab.Screen name="Write" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
