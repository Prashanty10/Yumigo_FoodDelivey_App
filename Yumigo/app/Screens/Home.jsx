import React, { useCallback, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import Banner from "../Homecomponents/Banner";
import Toppicks from "../Homecomponents/Toppicks";
import Recommended from "../Homecomponents/Recommended";

export default function Home() {
  const [image, setimage] = useState("");
  const [vegMode, setVegMode] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const userimage = async () => {
        const imageurl = await AsyncStorage.getItem("profileImage");
        setimage(imageurl);
      };
      userimage();
    }, []),
  );

  const HeaderComponent = () => (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {image ? (
            <Image source={{ uri: image }} style={styles.userimage} />
          ) : (
            <Ionicons name="person-circle" size={wp("14%")} color="#ff7c2b" />
          )}

          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Deliver to</Text>
            <Text style={styles.location}>Palghar, Maharashtra</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="cart" size={22} color="#3c3c3c" />
          </Pressable>

          <Pressable style={styles.iconBtn}>
            <Ionicons name="notifications" size={22} color="#ff8f45" />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#4d4d4d" />

          <TextInput
            placeholder="Search food, restaurants..."
            placeholderTextColor="#4d4d4d"
            style={styles.input}
          />
        </View>

        <Pressable
          style={[styles.vegBtn, vegMode && styles.vegActive]}
          onPress={() => setVegMode(!vegMode)}
        >
          <Text style={[styles.vegText, vegMode && styles.vegTextActive]}>
            VEG
          </Text>
        </Pressable>
      </View>

      <Banner />
      <Toppicks />
    </SafeAreaView>
  );

  return (
    <FlatList
      data={[1]}
      renderItem={() => <Recommended />}
      ListHeaderComponent={HeaderComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  userimage: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    marginRight: wp("3%"),
  },

  locationContainer: {
    justifyContent: "center",
  },

  locationTitle: {
    fontSize: wp("3.5%"),
    color: "#888",
  },

  location: {
    fontSize: wp("3.8%"),
    fontWeight: "500",
    color: "#000",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBtn: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("2%"),
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("2%"),
    paddingHorizontal: wp("4%"),
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    borderRadius: 15,
    paddingHorizontal: wp("3%"),
    height: hp("7%"),
  },

  input: {
    flex: 1,
    marginLeft: wp("2%"),
    fontSize: wp("3.8%"),
    color: "#000",
  },

  vegBtn: {
    marginLeft: wp("3%"),
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("0.8%"),
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#4CAF50",
  },

  vegActive: {
    backgroundColor: "#4CAF50",
  },

  vegText: {
    fontSize: wp("3.5%"),
    color: "#4CAF50",
    fontWeight: "600",
  },

  vegTextActive: {
    color: "#fff",
  },
});
