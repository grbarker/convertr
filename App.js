import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { white, blue, my_blue, my_green, my_light_green } from './utils/colors'

export default class App extends React.Component {

  state = {
    modalVisible: false,
    category: null,
    index: null,
  };

  info = [
    {
      category: "Angle",
      icon: null
    },
    {
      category: "Area",
      icon: null
    },
    {
      category: "Currency",
      icon: null
    },
    {
      category: "Data",
      icon: null
    },
    {
      category: "Length",
      icon: null
    },
    {
      category: "Mileage",
      icon: null
    },
  ]

  setModalVisible = () => {
    this.setState({
      modalVisible: true,
    })
  }
  setModalHidden = (cat, index) => {
    this.setState({
      modalVisible: false,
      category: cat,
      index: index,
    })
  }

  render() {
    const { category, index, modalVisible } = this.state

    return (
      <SafeAreaView style={styles.innerContainer}>
      <Button
        onPress={this.setModalVisible}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changed it to a class component</Text>
        <Text>You're now converting {category}</Text>
        <Text>You're now at index {index}</Text>
          <Modal
            style={{
              flex: 1, justifyContent: 'space-around', alignItems: 'center',
              backgroundColor: white, marginTop: 70,
            }}
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.textItem}>
                <Text style={styles.text}>Hello World!</Text>
                {this.info.map((cat, index) => {
                  return (
                    <View style={styles.textItem}>
                      <TouchableOpacity key={index} onPress={ e => this.setModalHidden(cat.category, index)}>
                        <Text style={styles.text}>{cat.category}</Text>
                        <Text style={styles.text}>{cat.index}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                })}
                <Button
                  onPress={this.setModalHidden}
                  title="Close"
                  color="#841584"
                  accessibilityLabel="Close the modal window"
                />
              </View>
            </View>
          </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 52,
    borderWidth: 2,
    borderColor: my_light_green,
    borderRadius: 12,
  },
  node: {
    flex: 1,
    width: "100%",
    color: my_blue,
  },
  textItem: {
    margin: 20,
    borderBottomWidth: 2,
    borderColor: my_green,
    borderRadius: 2,
    backgroundColor: my_light_green,
  },
  text: {
     fontSize: 18,
     color: '#42260A'
  }
});
