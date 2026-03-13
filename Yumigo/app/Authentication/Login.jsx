import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../Api/Api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function Login() {
  const [Email, setemail] = useState("");
  const [Password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handellogin = async () => {
    setloading(true);
    try {
      const res = await api.post("/login", {
        Email,
        Password,
      });
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("Name", res.data.user.name);
      await AsyncStorage.setItem("Email", res.data.user.email);
      router.replace("../Screens/Home");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login Failed");

      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setloading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.headerImage}
              source={{
                uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640777.jpg&fm=jpg",
              }}
              resizeMode="cover"
            />
          </View>

          <View style={styles.centerContainer}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#565656"
                value={Email}
                onChangeText={setemail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#565656"
                secureTextEntry
                value={Password}
                onChangeText={setpassword}
              />
            </View>

            {errorMessage !== "" && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <Pressable style={styles.forgetPasswordContainer}>
              <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
            </Pressable>

            <Pressable style={styles.signInButton} onPress={handellogin}>
              <Text style={styles.signInText}>
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.registerContainer}
              onPress={() => router.replace("./Register")}
            >
              <Text style={styles.registerText}>
                Not Registered Yet? Register Now
              </Text>
            </Pressable>
          </View>

          <View style={styles.orContainer}>
            <View style={styles.line} />

            <Text style={styles.orText}>OR</Text>

            <View style={styles.line} />
          </View>

          <Pressable style={styles.googleButton}>
            <Image
              style={styles.googleIcon}
              source={{
                uri: "https://img.icons8.com/3d-fluency/1200/google-logo.png",
              }}
            />

            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  imageContainer: {
    alignItems: "center",
  },

  headerImage: {
    width: wp("92%"),
    height: hp("30%"),
    borderRadius: wp("5%"),
  },

  centerContainer: {
    alignItems: "center",
    marginTop: hp("3%"),
  },

  title: {
    fontSize: wp("8%"),
    fontWeight: "bold",
    color: "#F3711C",
    marginBottom: hp("2%"),
  },

  inputContainer: {
    width: wp("85%"),
  },

  textInput: {
    width: "100%",
    height: hp("6.5%"),
    borderWidth: 1.5,
    borderColor: "#707070",
    borderRadius: wp("4%"),
    paddingHorizontal: wp("4%"),
    marginVertical: hp("1%"),
    fontSize: wp("4%"),
    color: "#000",
  },

  forgetPasswordContainer: {
    width: wp("85%"),
    alignItems: "flex-end",
    marginTop: hp("0.5%"),
  },

  forgetPasswordText: {
    color: "#F3711C",
    fontSize: wp("3.8%"),
  },

  signInButton: {
    backgroundColor: "#F3711C",
    width: wp("45%"),
    height: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
    marginTop: hp("1.5%"),
  },

  signInText: {
    color: "#ffffff",
    fontSize: wp("5%"),
    fontWeight: "bold",
  },

  registerContainer: {
    marginTop: hp("2%"),
  },

  registerText: {
    fontSize: wp("3.8%"),
    color: "#333",
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("4%"),
    gap: wp("3%"),
  },

  line: {
    borderWidth: 0.5,
    borderColor: "#d8d7d7",
    width: wp("35%"),
  },

  orText: {
    fontSize: wp("4%"),
    color: "#555",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("60%"),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#b2b2b2",
    borderRadius: wp("7%"),
    paddingVertical: hp("1.5%"),
    marginTop: hp("3%"),
    gap: wp("3%"),
  },

  googleIcon: {
    width: wp("7%"),
    height: wp("6%"),
  },

  googleText: {
    fontSize: wp("4%"),
    color: "#000",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: wp("3.8%"),
    marginTop: hp("0.5%"),
    marginLeft: wp("2%"),
  },
});
