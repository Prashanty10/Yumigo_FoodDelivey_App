import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import api from "../Api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Register() {
  const router = useRouter();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handelregister = async () => {
  setLoading(true);

  try {
    const res = await api.post("/register", {
      Name,
      Email,
      Password,
    });

    await AsyncStorage.setItem("token", res.data.token);
    await AsyncStorage.setItem("Name",res.data.user.name);
    await AsyncStorage.setItem("Email",res.data.user.email);

    router.replace("../Screens/Home")
  

  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data);
    setErrorMessage(
      error.response?.data?.message || "Register failed"
    );

    Toast.show({
      type: "error",
      text1: "Register Failed",
      text2: error.response?.data?.message || "Something went wrong",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 🔥 Header Image */}
          <View style={styles.imageContainer}>
            <Image
              style={styles.headerImage}
              source={{
                uri: "https://thumbs.dreamstime.com/b/big-dinner-table-italian-food-pizzas-pastas-appetizers-wine-220291127.jpg",
              }}
              resizeMode="cover"
            />
          </View>

          <View style={styles.centerContainer}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Full Name"
                value={Name}
                onChangeText={setName}
              />

              <TextInput
                style={styles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                value={Email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />

              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry
                value={Password}
                onChangeText={setPassword}
              />
            </View>

            {errorMessage !== "" && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <Pressable
              style={[styles.registerButton, loading && { opacity: 0.7 }]}
              disabled={loading}
              onPress={handelregister}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Register</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.loginContainer}
              onPress={() => router.push("./Login")}
            >
              <Text style={styles.loginText}>
                Already have an account? Login
              </Text>
            </Pressable>
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
  container: { flex: 1, backgroundColor: "#ffffff" },

  imageContainer: {
    alignItems: "center",
    marginTop: hp("2%"),
  },

  headerImage: {
    width: wp("92%"),
    height: hp("28%"),
    borderRadius: wp("5%"),
  },

  centerContainer: {
    alignItems: "center",
    marginTop: hp("3%"),
  },

  title: {
    fontSize: wp("7%"),
    fontWeight: "bold",
    color: "#22C55E", // ✅ Changed to green
    marginBottom: hp("3%"),
  },

  inputContainer: {
    width: wp("85%"),
  },

  textInput: {
    width: "100%",
    height: hp("6.5%"),
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: wp("4%"),
    paddingHorizontal: wp("4%"),
    marginBottom: hp("2%"),
    fontSize: wp("4%"),
    backgroundColor: "#fafafa",
  },

  registerButton: {
    backgroundColor: "#22C55E", // ✅ Green button
    width: wp("60%"),
    height: hp("6%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
    marginTop: hp("1%"),
  },

  registerButtonText: {
    color: "#ffffff",
    fontSize: wp("5%"),
    fontWeight: "bold",
  },

  loginContainer: {
    marginTop: hp("2%"),
  },

  loginText: {
    fontSize: wp("3.8%"),
    color: "#333",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("65%"),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp("7%"),
    paddingVertical: hp("1.5%"),
    marginTop: hp("4%"),
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
    marginBottom: hp("1%"),
  },
});
