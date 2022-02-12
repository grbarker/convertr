import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Pressable, Text, View, Button, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { white, pink, blue, orange, purple, my_blue, my_green, my_light_green, my_light_blue } from './utils/colors'
import WheelPicker from 'react-native-wheely';

export default class App extends React.Component {

  state = {
    modalVisible: false,
    category: null,
    index: 3,
    index2: 3,
    selected: 3,
    selected2: 3,
    selectedValue: null,

  };

  info = [
    {
      category: "Pressure",
      icon: null,
      options: [
        "Atmosphere (standard)", "Atmosphere (technical)", "Bar (bar)",
        "Millibar (mbar)", "Inch Mercury (inHg)", "Millimeter Mercury (mmHg)",
        "Pascal (Pa)", "Megapascal (MPa)", "Pound/sq inch (psi)",
        "Pound/sq foot (psf)", "Torr (Torr)"
      ],
      units : [
        {
          name: "Atmosphere (standard)",
          unit: "atm",
        },
        {
          name: "Atmosphere (technical)",
          unit: "atm",
        },
        {
          name: "Bar",
          unit: "bar",
        },
        {
          name: "Millibar (mbar)",
          unit: "atm",
        },
        {
          name: "Inch Mercury (inHg)",
          unit: "inHg",
        },
        {
          name: "Millimeter Mercury (mmHg)",
          unit: "mmHg",
        },
        {
          name: "Pascal (Pa)",
          unit: "Pa",
        },
        {
          name: "Kilopascal (kPa)",
          unit: "kPa",
        },
        {
          name: "Megapascal (MPa)",
          unit: "MPa",
        },
        {
          name: "Pound/sq inch (psi)",
          unit: "psi",
        },
        {
          name: "Pound/sq foot (psf)",
          unit: "lbsqft",
        },
        {
          name: "Torr (Torr)",
          unit: "Torr",
        },
    ],
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
  updateIndex = (index) => {
    this.setState({
      index: index
    }, () => {console.log('index..........   ', index);
      console.log('this.info.units[index].unit..........   ', this.info[0].units[index].unit);
      console.log('........................................');
    });
  }
  updateIndex2 = (index2) => {
    this.setState({
      index2
    }, () => {console.log('index2..........   ', index2);
    console.log('this.info.units[index2].unit..........   ', this.info[0].units[index2].unit);
    console.log('........................................');
    });
  }
  componentDidMount() {
    console.log('////////////////////////////////////////////*');
    console.log('this.info[0].options');
  }


  render() {
    const { category, index, index2, selected, selected2, selectedValue, modalVisible } = this.state
    const options = this.info[0].options
    console.log('////////////////////////////////////////////*');
    const  label = ["unit", "unit"]

    return (
      <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
              <View style={styles.outerWheelyContainer}>
                  <View style={styles.innerWheelyContainer}>
                    <Text style={{fontSize: 22}} style>The input will go here</Text>
                    <WheelPicker
                      selectedIndex={selected}
                      options={options}
                      onChange={(index) => this.updateIndex(index)}
                      containerStyle={{
                        width: "90%",
                      }}
                    />
                  </View>
                  <View style={styles.innerWheelyContainer}>
                    <Text style={{fontSize: 22}} style>The output will go here</Text>
                    <WheelPicker
                      selectedIndex={selected2}
                      options={options}
                      onChange={(index2) => this.updateIndex2(index2)}
                      containerStyle={{
                        width: "90%",
                      }}
                    />
                  </View>
              </View>
              <View style={styles.container}>
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
                    }}
                  >
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
                           onPress={() => this.setModalHidden()}
                           title="Close"
                           color="#841584"
                           accessibilityLabel="Close the modal window"
                        />
                      </View>
                    </View>
                  </Modal>
              </View>
          </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lowerContainer: {
    flex: 1,
    borderWidth: 4,
    borderColor: pink,
    backgroundColor: "darkorange",
  },
  innerWheelyContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
    borderWidth: 4,
    borderColor: "green",
  },
  outerWheelyContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 6,
    borderColor: "darkgreen",
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
