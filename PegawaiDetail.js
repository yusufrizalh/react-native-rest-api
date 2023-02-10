import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Input, Button } from "react-native-elements";

export default class PegawaiDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textId: "",
      textNama: "",
      textGaji: "",
    };
  }

  componentDidMount() {
    this.setState({
      textId: this.props.route.params.pegawai_id,
      textNama: this.props.route.params.pegawai_nama,
      textGaji: this.props.route.params.pegawai_gaji,
    });
  }

  ubahDataPegawai = () => {
    fetch("http://192.168.1.101/my-react-crud/UpdateDataPegawai.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pegawai_id: this.state.textId,
        pegawai_nama: this.state.textNama,
        pegawai_gaji: this.state.textGaji,
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

  hapusDataPegawai = () => {
    fetch("http://192.168.1.101/my-react-crud/HapusDataPegawai.php", {
      method: "POST",
      body: JSON.stringify({
        pegawai_id: this.state.textId,
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
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input disabled value={this.state.textId} />
        <Input
          placeholder="Tuliskan nama pegawai"
          value={this.state.textNama}
          onChangeText={(textInputValue) =>
            this.setState({
              textNama: textInputValue,
            })
          }
        />
        <Input
          placeholder="Tuliskan gaji pegawai"
          value={this.state.textGaji}
          onChangeText={(textInputValue) =>
            this.setState({
              textGaji: textInputValue,
            })
          }
        />
        <Button title="Ubah" onPress={this.ubahDataPegawai} />
        <Button title="Hapus" onPress={this.hapusDataPegawai} />
      </View>
    );
  }
}
