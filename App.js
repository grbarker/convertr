import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Pressable, Text, View, Button, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import {
  white, pink, blue, orange, purple, my_blue, my_green, my_light_green,
  my_light_blue, gray3, gray7 } from './utils/colors'
import WheelPicker from 'react-native-wheely';

export default class App extends React.Component {

  state = {
    modalVisible: false,
    selectedCategory: "Angle",
    index: 3,
    index2: 3,
    selected: 3,
    selected2: 3,
    selectedValue: null,
    input: "0",
    posInput: true,
    output: "0",
    options: [
      "Radian (rad)", "Degree (deg)", "Gradian (grad)", "Cycle (cycle)",
      "Arcsecond (arcsec)", "Arcminute (arcmin)"
    ],
    units: ["rad", "deg", "grad", "cycle", "arcsec", "arcmin"]

  };

  info = [
    {
      category: "Angle", icon: null,
      options: [
        "Radian (rad)", "Degree (deg)", "Gradian (grad)", "Cycle (cycle)",
        "Arcsecond (arcsec)", "Arcminute (arcmin)"
      ],
      units: ["rad", "deg", "grad", "cycle", "arcsec", "arcmin"]
    },
    {
      category: "Area", icon: null,
      options: [
        "Square Kilometer (km²)", "Square Meter (m²)", "Square Decimeter (dm²)",
        "Square Centimeter (cm²)", "Square Millimeter (mm2)", "Square Inch (in²)",
        "Square Foot (ft²)", "Square Yard (yd²)", "Square Mile (mi²)",
        "Square Rod (rod²)", "Square Chain (ch²)", "Square Mil (mil²)",
        "Acre (ac)", "Hectare (ha)"
      ],
      units: [
        "km2", "m2", "dm2", "cm2", "mm2", "sqin", "sqft", "sqyd", "sqmi",
      "sqrd", "sqch", "sqmil", "acre", "hectare"
    ]
    },
    {
      category: "Data", icon: null,
      options: [
        "Bit (bit)", "Byte (b)" , "Kilobyte (KB)", "Megabyte (MB)",
        "Gigabyte (GB)", "Terabyte  (TB)", "Petabyte (PB)",
        "Exabyte (EB)",
      ],
      units: [
        "b", "B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"
      ]
    },
    {
      category: "Energy", icon: null,
      options: [
        "Joule (J)", "BTU (BTU)", "Electronvolt (eV)", "Watt-hour (Wh)",
        "Kilowatt-hour (kWh)", "Erg (erg)"
      ],
      units: ["J", "BTU", "eV", "Wh", "kWh", "erg"]
    },
    {
      category: "Force", icon: null,
      options: [
        "Newton (N)", "Dyne (dyn)", "Poundforce (lbf)", "Kip (kip)"
      ],
      units: ["N", "dyn", "lbf", "kip"]
    },
    {
      category: "Length", icon: null,
      options: [
        "Meter (m)", "Inch (in)", "Foot (ft)", "Yard (yd)", "Mile (mi)",
        "Link (li)", "Rod (rod)", "Chain (ch)", "Angstrom (A)", "Mil (mil)"
      ],
      units: [
        "m", "in", "ft", "yd", "mi", "li", "rd", "ch", "angstrom", "mil"
      ]
    },
    {
      category: "Liquid Volume", icon: null,
      options: [
        "Minim (min)", "Fluiddram (fldr)", "Fluidounce (floz)", "Gill (gi)",
        "Cup (cp)", "Pint (pt)", "Quart (qt)", "Gallon (gal)",
        "Beerbarrel (bbl)", "Oilbarrel (obl)", "Hogshead (hhd)", "Drop (gtt)"
      ],
      units: [
        "min", "fldr", "floz", "gi", "cp", "pt", "qt", "gal", "bbl", "obl",
        "hhd", "gtt"
      ]
    },
    {
      category: "Mass", icon: null,
      options: [
        "Gram (g)", "Tonne (tonne)", "Ton (ton)", "Grain (gr)", "Dram (dr)",
        "Ounce (oz)", "Poundmass (lbm, lb, lbs)", "Hundredweight (cwt)",
        "Stick (stick)", "Stone (st)"
      ],
      units: [
        "g", "tonne", "toneV", "gr", "dr", "oz", "lbm", "cwt", "stick", "stone"
      ]
    },
    {
      category: "Pressure", icon: null,
      options: [
        "Atmosphere (standard) (atm)", "Atmosphere technical (at)", "Bar (bar)",
        "Millibar (mbar)", "Pascal (Pa)", "Pound/sq inch (psi)",  "Torr (Torr)",
        "Millimeter Mercury (mmHg)", "Millimeter Water (mmH₂O)",
        "Centimeter Water (cmH₂O)"
      ],
      units: [
        "atm", "at", "bar", "mbar", "Pa", "kPa", "MPa", "psi", "torr", "mmHg",
        "mmH2O", "cmH2O"
      ]
    },
    {
      category: "Temperature", icon: null,
      options: [
        "Kelvin (K)", "Celsius ( °C)", "Fahrenheit ( °F)", "Rankine (°R)"
      ],
      units: ["K", "degC", "dergF", "degR"]
    },
    {
      category: "Time", icon: null,
      options: [
        "Second (s)", "Minute (min)", "Hour (hr)", "Day (day)", "Week (week)",
        "month (month)", "year (year)", "Decade (decade)", "Century (centuries)",
        "Millennium (millennia)"
      ],
      units: [
        "s", "mins", "hr", "days", "weeks", "months", "years", "decades",
        "centuries", "millennia"
      ]
    },
    {
      category: "Volume", icon: null,
      options: [
        "Cubic meter (m³)", "Litre (l)", "Cubic centimeter (cc)",
        "Cubic inch (in³)", "Cubic foot (ft³)", "Cubic yard (yd³)",
        "Teaspoon (tsp)", "Tablespoon (Tbsp)"
      ],
      units: [
        "m3", "L", "cc", "cuin ", "cuft", "cuyd", "teaspoon", "tablespoon"
      ]
    },
  ]


  setModalVisible = () => {
    this.setState({
      modalVisible: true,
    })
  }
  setModalHidden = (cat, index) => {
    this.info.map((category, index) => {
      cat === category.category
      ? this.setState({
        modalVisible: false,
        selectedCategory: cat,
        options: category.options,
        units: category.units,
        index: index,
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
      selectedCategory, modalVisible, input, output, options } = this.state

    console.log('////////////////////////////////////////////*');
    const  label = ["unit", "unit"]

    return (
      <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={{fontSize: 24}}>{selectedCategory}</Text>
            </View>
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
                    <View style={styles.modalTitle}>
                      <Text style={{fontSize: 24}}>Categories</Text>
                    </View>
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
                    <View>
                      <Button
                        onPress={this.closeModal}
                        title={"Close"}
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
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
    borderWidth: 4,
    borderColor: gray7,
  },
  titleContainer: {
    flex: 0.1,
    alignItems: "center",

  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 4,
    borderColor: pink,
    backgroundColor: "darkorange",
  },
  innerWheelyContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: 'center',
  },
  outerWheelyContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 6,
    borderColor: "pink",
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
  modalTitle: {
    flex: 0.2,
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
