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
    input: "0",
    posInput: true,
    output: "0",

  };

  info = [
    {category: "Angle", icon: null},
    {category: "Area", icon: null},
    {category: "Data", icon: null},
    {category: "Energy", icon: null},
    {category: "Force", icon: null},
    {category: "Length", icon: null},
    {category: "Liquid Volume", icon: null},
    {category: "Mass", icon: null},
    {category: "Pressure", icon: null,
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
    {category: "Temperature", icon: null},
    {category: "Time", icon: null},
    {category: "Volume", icon: null},
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
      console.log('this.info.units[index].unit..........   ', this.info[8].units[index].unit);
      console.log('........................................');
    });
  }
  updateIndex2 = (index2) => {
    this.setState({
      index2
    }, () => {console.log('index2..........   ', index2);
    console.log('this.info.units[index2].unit..........   ', this.info[8].units[index2].unit);
    console.log('........................................');
    });
  }
  addNum = (num) =>{
    this.setState({
      input: this.state.input + num
    });
  }
  removeNum = () =>{
    this.setState({
      input: this.state.input.slice(0,-1)
    });
  }
  clearNum = () =>{
    this.setState({
      input: 0,
      output: 0
    });
  }
  switchNum = () => {
    const { input, output } = this.state
    this.setState({
      input: output,
      output: input
    });
  }
  negPos = () => {
    const { input, posInput } = this.state
    posInput
    ? this.setState({input: "-" + input, posInput: false})
    : this.setState({input: input.slice(1), posInput: true});
  }
  componentDidMount() {
  }


  render() {
    const { category, index, index2, selected, selected2, selectedValue,
      modalVisible, input, output } = this.state
    const options = this.info[8].options
    console.log('////////////////////////////////////////////*');
    const  label = ["unit", "unit"]

    return (
      <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
              <View style={styles.outerWheelyContainer}>
                  <View style={styles.innerWheelyContainer}>
                    <Text style={{fontSize: 22}} style>The input is: {input}</Text>
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
                    <Text style={{fontSize: 22}} style>The output is: {output}</Text>
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
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={ e => this.addNum("7")}>
                    <Text style={styles.text}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.addNum("8")}>
                    <Text style={styles.text}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.addNum("9")}>
                    <Text style={styles.text}>9</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.removeNum()}>
                    <Text style={styles.text}>Back</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={ e => this.addNum("4")}>
                    <Text style={styles.text}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.addNum("5")}>
                    <Text style={styles.text}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.addNum("6")}>
                    <Text style={styles.text}>6</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.clearNum()}>
                    <Text style={styles.text}>Clear</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={ e => this.addNum("1")}>
                    <Text style={styles.text}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.addNum("2")}>
                    <Text style={styles.text}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.addNum("3")}>
                    <Text style={styles.text}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.switchNum("switch")}>
                    <Text style={styles.text}>Switch</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={ e => this.addNum("0")}>
                    <Text style={styles.text}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.addNum(".")}>
                    <Text style={styles.text}>.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ e => this.negPos()}>
                    <Text style={styles.text}>+/-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.setModalVisible}>
                    <Text style={styles.text}>Menu</Text>
                  </TouchableOpacity>
                </View>
                <Button
                  onPress={this.setModalVisible}
                  title="Learn More"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
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
                  <Text>You're now converting {category}</Text>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Angle", 0)}>
                        <Text>Angle</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Area", 1)}>
                        <Text>Area</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Data", 2)}>
                        <Text>Data</Text></TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Energy", 3)}>
                        <Text>Energy</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Force", 4)}>
                        <Text>Force</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Length", 5)}>
                        <Text>Length</Text></TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Liquid Volume", 6)}>
                        <Text>Liquid Volume</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Mass", 7)}>
                        <Text>Mass</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Pressure", 8)}>
                        <Text>Pressure</Text></TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Temperature", 9)}>
                        <Text>Temperature</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Time", 10)}>
                        <Text>Time</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Volume", 11)}>
                        <Text>Volume</Text></TouchableOpacity>
                    </View>
                  <Text>You're now at index {index}</Text>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
,    borderWidth: 4,
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
  CategoryButton: {
    flex: 1,
    fontSize: 18,
    backgroundColor: my_light_green,
    padding: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
     fontSize: 20,
     color: '#42260A'
  }
});
