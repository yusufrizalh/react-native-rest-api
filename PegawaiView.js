import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Card, Button } from "react-native-elements";

export default class PegawaiView extends Component {
  // membuat nilai awal menggunakan constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataPegawaiArray: [], // diawal masih kosong
    };
  }

  // ambil semua data pegawai
  ambilSemuaDataPegawai = () => {
    fetch("http://192.168.1.101/my-react-crud/LihatSemuaPegawai.php", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataPegawaiArray: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    // this.ambilSemuaDataPegawai();
    // mekanisme refresh
    this.props.navigation.addListener("focus", () => {
      this.ambilSemuaDataPegawai();
    });
  }

  // melewatkan data yg dipilih dari pegawaiview ke pegawaidetail
  passDataPegawai = (pegawai_id, pegawai_nama, pegawai_gaji) => {
    this.props.navigation.navigate("PegawaiDetail", {
      pegawai_id: pegawai_id,
      pegawai_nama: pegawai_nama,
      pegawai_gaji: pegawai_gaji,
    });
  };

  openQrCodeScanner = () => {
    this.props.navigation.navigate("QRScanner");
  };

  openPegawaiAdd = () => {
    this.props.navigation.navigate("PegawaiAdd");
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Ambil data pegawai dari REST API</Text>
        {/* <Button title="QRCode Scanner" onPress={this.openQrCodeScanner} /> */}
        <Button title="Tambah Data" onPress={this.openPegawaiAdd} />
        <FlatList
          data={this.state.dataPegawaiArray}
          keyExtractor={(item) => item.pegawai_id}
          renderItem={({ item }) => (
            <Card>
              <View>
                <TouchableOpacity
                  onPress={this.passDataPegawai.bind(
                    this,
                    item.pegawai_id,
                    item.pegawai_nama,
                    item.pegawai_gaji
                  )}
                >
                  <Text>
                    ID: {item.pegawai_id} | Nama: {item.pegawai_nama}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
        />
      </View>
    );
  }
}
