import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, Image, Modal, Alert } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.innerContainer}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changed it to a class component</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
