import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Pressable, Text, View, Button, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import {
  white, pink, blue, orange, purple, my_blue, my_green, my_light_green,
  my_light_blue, gray3, gray7 } from './utils/colors'
import WheelPicker from 'react-native-wheely';
import { evaluate, sqrt } from 'mathjs'
import {
  Ionicons, MaterialCommunityIcons, SimpleLineIcons
} from '@expo/vector-icons';

export default class App extends React.Component {

  state = {
    modalVisible: false,
    selectedCategory: "Angle",
    index: 2,
    index2: 2,
    selected: 2,
    selected2:2,
    selectedValue: null,
    input: "0",
    posInput: true,
    response: {},
    convertResponse: {},
    output: "0",
    options: [
      "Radian (rad)", "Degree (deg)", "Gradian (grad)", "Arcsecond (arcsec)",
      "Arcminute (arcmin)"
    ],
    units: ["rad", "deg", "grad", "arcsec", "arcmin"]

  };

  convert = require('convert-units')

  info = [
    {
      category: "Angle", icon: null,
      options: [
        "Radian (rad)", "Degree (deg)", "Gradian (grad)",
        "Arcsecond (arcsec)", "Arcminute (arcmin)"
      ],
      units: ["rad", "deg", "grad", "arcsec", "arcmin"]
    },
    {
      category: "Area", icon: null,
      options: [
        "Square Kilometer (km²)", "Square Meter (m²)", "Square Centimeter (cm²)",
        "Square Millimeter (mm2)", "Square Inch (in²)", "Square Foot (ft²)",
        "Square Mile (mi²)", "Acre (ac)", "Hectare (ha)"
      ],
      units: [
        "km2", "m2", "cm2", "mm2", "in2", "ft2",
        "mi2", "ac", "ha"
    ]
    },
    {
      category: "Data", icon: null,
      options: [
        "Bit (bit)", "Kilobit (Kb)", "Megabit (Mb)", "Gigabit (Gb)",
        "Terabit  (Tb)", "Byte (byte)" , "Kilobyte (KB)", "Megabyte (MB)",
        "Gigabyte (GB)", "Terabyte  (TB)"
      ],
      units: [
        "b",  "Kb", "Mb", "Gb", "Tb", "B", "KB", "MB", "GB", "TB",
      ]
    },
    {
      category: "Energy", icon: null,
      options: [
        "Joule (J)", "Kilojoule (kJ)", "Watt-hour (Wh)", "Kilowatt-hour (kWh)",
        "Megawatt-hour (MWh)", "Gigawatt-hour (GWh)",
      ],
      units: ["J", "kJ", "Wh", "kWh", "MWh", "GWh"]
    },
    {
      category: "Length", icon: null,
      options: [
        "Meter (m)", "Centimeter (m)", "Millimeter (m)", "Inch (in)",
        "Foot (ft)", "Mile (mi)"
      ],
      units: [
        "m", "cm", "mm", "in", "ft", "mi",
      ]
    },
    {
      category: "Mass", icon: null,
      options: [
        "Gram (g)", "Milligram (mg)", "Microgram (μg, mcg)", "Tonne (tonne)",
        "Ton (ton)", "Ounce (oz)", "Pound (lb)",
      ],
      units: [
        "g", "mg", "mcg", "mt", "t", "oz", "lb"
      ]
    },
    {
      category: "Pressure", icon: null,
      options: [
        "Pascal (Pa)", "Kilopascal (kPa)", "Megapascal (MPa)", "Bar (bar)",
        "Pound/sq inch (psi)", "Kilopound/sq inch (ksi)", "Torr (Torr)"
      ],
      units: [
        "Pa", "kPa", "MPa", "bar", "psi", "ksi", "torr",
      ]
    },
    {
      category: "Speed", icon: null,
      options: [
        "Meters/second (m/s)", "Kilometer/hour (km/h)", "Meter/hour (m/h)",
        "Knot (knot)", "Feet/second (ft/s)"
      ],
      units: ["m/s", "km/h", "m/h", "knot", "ft/s"]
    },
    {
      category: "Temperature", icon: null,
      options: [
        "Kelvin (K)", "Celsius ( °C)", "Fahrenheit ( °F)", "Rankine (°R)"
      ],
      units: ["K", "C", "F", "R"]
    },
    {
      category: "Time", icon: null,
      options: [
        "Nanoecond (s)","Millisecond (s)", "Second (s)",  "Minute (min)",
        "Hour (hr)", "Day (day)", "Week (week)", "Month (month)", "Year (year)",
      ],
      units: [
        "ns", "ms", "s", "min", "h", "d", "week", "month", "year"
      ]
    },
    {
      category: "Volume", icon: null,
      options: [
        "Cubic kilometer (km³)", "Cubic meter (m³)", "Cubic centimeter (cc, cm³)",
        "Cubic millimeter (mm³)", "Kilolitre (kL)", "Litre (L)", "Millilitre (mL)",
        "Cubic inch (in³)", "Cubic foot (ft³)", "Cubic yard (yd³)",
        "Gallon (gal)", "Quart (qt)", "Pint (pt)", "Cup (cp)", "Fluid Oz (fl.oz.)",
        "Teaspoon (tsp)", "Tablespoon (Tbsp)"
      ],
      units: [
        "km3", "m3", "cm3", "mm3", "kl", "l", "ml", "in3", "ft", "yd3", "gal",
        "qt", "pnt", "cup", "fl-oz ", "tsp", "Tbs"
      ]
    },
    {
      category: "Volumetric Flow Rate", icon: null,
      options: [
        "Cubic Centimeter/second (cm³/s)", "Milliliter/second (ml/s)",
        "Liter/second (l/s)", "Liter/minute (L/min)", "Liter/hour (L/h)",
        "Cubic Meter/Hour (m³/h)", "Gallon/Min (gal/min)",
        "Gallon/Hour (gal/h)", "Cubic Foot/Minute (ft³/min)",
        "Cubic Feet/Hour (ft³/h)"
      ],
      units: [
        "cm3/s", "ml/s", "l/s", "l/min", "l/h", "m3/h", "gal/min", "gal/h",
        "ft3/min", "ft3/h"
      ]

    }
  ]

  setModalVisible = () => {
    this.setState({
      modalVisible: true,
      index: 2,
      index2: 2,
      selected: 2,
      selected2: 2,
    })
  }
  setModalHidden = (cat) => {
    this.info.map((category) => {
      cat === category.category
      ? this.setState({
        modalVisible: false,
        selectedCategory: cat,
        index: 2,
        index2: 2,
        selected: 2,
        selected2: 2,
        options: category.options,
        units: category.units,
      }, () => {
        console.log(this.state.selectedCategory)
        console.log(this.state.options)
        console.log(this.state.units)
      })
      : null
    })

  }
  closeModal =() => {
    this.setState({
      modalVisible: false
    })
  }
  updateIndex = (index) => {
      const { input, index2, units }  = this.state
      const length = units.length
      index >= 0 && index < length
      ? this.setState({
        index: index,
        selected: index,
        output: this.convert(input).from(units[index]).to(units[index2])
      })
      : null
  }
  updateIndex2 = (index2) => {
    const { input, index, units }  = this.state
    const length = units.length
    let value = this.convert(input).from(units[index]).to(units[index2])
    let valueStr = String(value)
    console.log("CONVERSION VALUE: _____________________", value)
    console.log("CONVERSION VALUE STRING: _____________________", valueStr)
    if (valueStr.includes(".")) {
      console.log("CONVERSION DECIMAL STRING LENGTH: _____________________", valueStr.split(".")[1].length)
      if (valueStr.split(".")[1].length > 5) {
        console.log("CONVERSION TO FIXED: _____________________", value.toFixed(5))
        output = value.toFixed(5)
        console.log("SETTING OUTPUT: _____________________", value.toFixed(5))
      } else {
        output = value
        console.log("REGULAR OUTPUT: _____________________", value)
      }
    } else {
      output = value
      console.log("REGULAR OUTPUT: _____________________", value)
    }
    index2 >= 0 && index2 < length
    ? this.setState({
      index2: index2,
      selected2: index2,
      output: output
    })
    : null
  }
  addNum = (num) =>{
    const { input, index, index2, units }  = this.state
    var input2 = input == 0 ? num : input + num
    this.setState({
      input: input2,
      output: this.convert(Number(input2)).from(units[index]).to(units[index2])
    });

  }
  removeNum = () =>{
    const { input, index, index2, units }  = this.state
    const holder = input.length == 1 ? "0" : input.slice(0, -1)
    this.setState({
      input: holder,
      output: this.convert(Number(holder)).from(units[index]).to(units[index2])
    });

  }
  clearNum = () =>{
    this.setState({
      input: "0",
      output: 0
    });
  }


  render() {
    const { category, index, index2, selected, selected2, selectedValue,
      selectedCategory, modalVisible, input, output, options } = this.state

    console.log('////////////////////////////////////////////');

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar
          backgroundColor="blue"
          barStyle="white"/>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.category}>{selectedCategory}</Text>
            </View>
              <View style={styles.outerWheelyContainer}>
                  <View style={styles.innerWheelyContainer}>
                    <View style={styles.inputOutput}>
                      <Text style={{fontSize: 22}}>{input}</Text>
                    </View>
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
                    <View style={styles.inputOutput}>
                      <Text style={{fontSize: 22}}>{output}</Text>
                    </View>
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
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("7")}>
                    <Text style={styles.text}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("8")}>
                    <Text style={styles.text}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("9")}>
                    <Text style={styles.text}>9</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={ e => this.removeNum()}>
                    <Text style={styles.text}>Back</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("4")}>
                    <Text style={styles.text}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("5")}>
                    <Text style={styles.text}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("6")}>
                    <Text style={styles.text}>6</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={ e => this.clearNum()}>
                    <Text style={styles.text}>Clear</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("1")}>
                    <Text style={styles.text}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("2")}>
                    <Text style={styles.text}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("3")}>
                    <Text style={styles.text}>3</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={this.setModalVisible}>
                    <Text style={styles.text}>Menu</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.numButton}>
                    <Text style={styles.text}>__</Text>
                  </View>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum("0")}>
                    <Text style={styles.text}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.numButton} onPress={ e => this.addNum(".")}>
                    <Text style={styles.text}>.</Text>
                  </TouchableOpacity>
                    <View style={styles.numButton}>
                      <Text style={styles.text}>__</Text>
                    </View>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    alert('Modal has been closed.');
                  }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalTitle}>
                      <Text style={{fontSize: 24, color: "white"}}>Categories</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Angle", 0)}>
                        <MaterialCommunityIcons name="angle-acute" size={30} color="blue" />
                        <Text style={styles.buttonText}>Angle</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Area", 1)}>
                        <MaterialCommunityIcons name="rectangle-outline" size={30} color="blue" />
                        <Text style={styles.buttonText}>Area</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Data", 2)}>
                        <MaterialCommunityIcons name="database" size={30} color="blue" />
                        <Text style={styles.buttonText}>Data</Text></TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Energy", 3)}>
                        <SimpleLineIcons name="energy" size={30} color="blue" />
                        <Text style={styles.buttonText}>Energy</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Length", 4)}>
                        <MaterialCommunityIcons name="ruler" size={30} color="blue" />
                        <Text style={styles.buttonText}>Length</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Mass", 5)}>
                        <MaterialCommunityIcons name="scale-balance" size={30} color="blue" />
                        <Text style={styles.buttonText}>Mass</Text></TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Pressure", 6)}>
                        <MaterialCommunityIcons name="pump" size={30} color="blue" />
                        <Text style={styles.buttonText}>Pressure</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Speed", 7)}>
                        <SimpleLineIcons name="speedometer" size={30} color="blue" />
                        <Text style={styles.buttonText}>Speed </Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Temperature", 8)}>
                        <MaterialCommunityIcons name="thermometer-lines" size={30} color="blue" />
                        <Text style={styles.buttonText}>Temperature</Text></TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Time", 9)}>
                        <MaterialCommunityIcons name="clock-time-four-outline" size={30} color="blue" />
                        <Text style={styles.buttonText}>Time</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Volume", 10)}>
                        <MaterialCommunityIcons name="beaker-outline" size={30} color="blue" />
                        <Text style={styles.buttonText}>Volume</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.CategoryButton} onPress={() => this.setModalHidden("Volumetric Flow Rate", 11)}>
                        <MaterialCommunityIcons name="water-pump" size={30} color="blue" />
                        <Text style={styles.buttonText}>Volumetric Flow Rate</Text></TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={this.closeModal}>
                        <Ionicons name="ios-close-circle-outline" size={40} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "blue",
  },
  statusBar: {
    backgroundColor: "blue",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    flex: 0.1,
    alignItems: "center",
    backgroundColor: "blue",

  },
  innerWheelyContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
    backgroundColor: "white",
  },
  outerWheelyContainer: {
    flex: 1,
    flexDirection: "row",
  },
  inputOutput: {
    borderWidth: 2,
    borderColor: gray7,
    borderRadius: 2,
    width: "100%",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 2,
    borderColor: purple,
    borderRadius: 8,
    backgroundColor: "blue",
  },
  numButton: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 2,
    borderColor: purple,
    borderRadius: 8,
    backgroundColor: "blue",
  },
  modalContainer: {
    marginTop: 100,
    flex: 1,
    alignItems: 'center',
    backgroundColor: "blue",
    borderColor: my_light_green,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  CategoryButton: {
    flex: 1,
    alignItems: "center",
    height: 92,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 12,
    paddingTop: 14,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  modalTitle: {
    flex: 0.25,
    color: "white"
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
     fontSize: 24,
     color: '#fff'
  },
  buttonText: {
    paddingTop: 8,
     fontSize: 14,
     color: 'blue'
  },
  category: {
    color: "white"
  }
});
