import React, { Component } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

export default class PegawaiAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputNama: "",
      textInputGaji: "",
    };
  }

  // menyimpan data pegawai baru
  simpanDataPegawai = () => {
    fetch("http://192.168.1.101/my-react-crud/InsertDataPegawai.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pegawai_nama: this.state.textInputNama,
        pegawai_gaji: this.state.textInputGaji,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
        // redirect kembali ke halaman pegawaiview
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: "PegawaiView" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Tuliskan nama pegawai"
          onChangeText={(textInputValue) =>
            this.setState({ textInputNama: textInputValue })
          }
        />
        <Input
          placeholder="Tuliskan gaji pegawai"
          onChangeText={(textInputValue) =>
            this.setState({ textInputGaji: textInputValue })
          }
        />
        <Button title="Simpan Data" onPress={this.simpanDataPegawai} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    flexDirection: "column",
    margin: 10,
  },
});
