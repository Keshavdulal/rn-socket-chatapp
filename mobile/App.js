/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import io from 'socket.io-client';

const App: () => React$Node = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [socket, setSocket] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://192.168.10.3:3000');
    setSocket(socket);

    // listening to emitted messages
    socket.on('chatMessage', (message) => {
      setChatMessages([...chatMessages, message]);
    });
  }, [chatMessages]);

  const submitChatMessage = () => {
    socket.emit('chatMessage', chatMessage);
    setChatMessage('');
  };

  const messageList = chatMessages.map((i) => <Text key={i}>{i}</Text>);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Text>Enter Your Message Below</Text>
          <TextInput
            placeholder="Message"
            autoCorrect="false"
            value={chatMessage}
            onChangeText={(input) => setChatMessage(input)}
            onSubmitEditing={submitChatMessage}
            style={{borderWidth: 1, marginTop: 10, padding: 10}}
          />

          {/* <FlatList
            style={{backgroundColor: 'coral', marginTop: 10}}
            data={chatMessages}
            renderItem={(item) => item}
            keyExtractor={(data) => <Text>{data}</Text>}
          /> */}

          <View style={{backgroundColor: 'rebeccapurple', marginTop: 10}}>
            {messageList}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.dark,
    backgroundColor: '#ccc',
    height: '100%',
    padding: '5%',
  },
});

export default App;
