import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(()=>{
   
    const authHandling = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          router.replace("../Authentication/Login");
          return;
        }

        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          await AsyncStorage.removeItem("token");
          router.replace("../Authentication/Login");
        } else {
          router.replace("../Screens/Home");
        }

      } catch (error) {
        router.replace("../Authentication/Login");
      }
    };

    const timer = setTimeout(()=>{
      authHandling();
    },2000)

    return()=>clearTimeout(timer)

  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/Logo.png")}
      />
      <LottieView
        style={styles.loader}
        source={require("../assets/images/loader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: wp("22%"),
    height: hp("22%"),
  },
  loader: {
    width: wp("20%"),
    height: hp("8%"),
  },
});
