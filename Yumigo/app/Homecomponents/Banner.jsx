import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import api from "../Api/Api";

export default function HeroBanner() {
  const [poster, setposter] = useState([]);

  const handelbanner = async () => {
    try {
      const res = await api.get("/banner");

      setposter(res.data.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    handelbanner();
  }, []);

  const renderitem = ({ item }) => (
    <View style={styles.bannerWrapper}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: wp("6%"), fontWeight: "600", marginTop: 10 }}>
        🔥 Yumigo Deals
      </Text>
      <FlatList
        data={poster}
        keyExtractor={(item) => item._id}
        renderItem={renderitem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
    paddingHorizontal:10
  },

  bannerWrapper: {
    marginTop: 10,
    marginHorizontal: wp("2%"),
    shadowColor: "#787878",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    borderRadius: 20,
    overflow: "hidden",
    
  },

  bannerImage: {
    height: hp("60%"),
    width: wp("80%"),
    borderRadius: 20,
    marginBottom:10
  },
});
