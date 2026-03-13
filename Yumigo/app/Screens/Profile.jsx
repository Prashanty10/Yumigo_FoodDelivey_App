import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [Imagehandel, setimagehandel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [email, setemail] = useState("Not Available");
  const [name, setname] = useState("Guest User");

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const username = await AsyncStorage.getItem("Name");
        const useremail = await AsyncStorage.getItem("Email");

        setname(username || "Guest User");
        setemail(useremail || "Not Available");
      };

      loadData();
    }, []),
  );

  const camerahandler = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setimagehandel(uri);
      await AsyncStorage.setItem("profileImage", uri);
    }
  };

  const Galleryhandler = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setimagehandel(uri);
      await AsyncStorage.setItem("profileImage", uri);
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) setimagehandel(savedImage);
    };
    loadImage();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp("15%"),
          backgroundColor: "#ffffff",
        }}
      >
        {showPreview && (
          <Pressable
            style={styles.previewContainer}
            onPress={() => setShowPreview(false)}
          >
            <Image source={{ uri: Imagehandel }} style={styles.previewImage} />
          </Pressable>
        )}

        <View style={styles.container}>
          <View style={styles.topHeader}>
            <Pressable style={styles.headerIcon}>
              <Ionicons name="person-outline" size={22} color="#000" />
            </Pressable>

            <Text style={styles.headerTitle}>Profile</Text>

            <Pressable style={styles.headerIcon}>
              <Ionicons name="notifications-outline" size={22} color="#000" />
            </Pressable>
          </View>
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <Pressable
                onPress={() => setModalVisible(true)}
                onLongPress={() => {
                  if (Imagehandel) setShowPreview(true);
                }}
              >
                {Imagehandel ? (
                  <Image
                    source={{ uri: Imagehandel }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Ionicons
                    name="person-circle"
                    size={wp("28%")}
                    color="#ff7c2b"
                  />
                )}

                <View style={styles.editIcon}>
                  <Ionicons name="camera" size={wp("4.5%")} color="#fff" />
                </View>
              </Pressable>

              <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.sectionTitle}>Account</Text>

            <MenuItem
              icon="person-outline"
              label="Edit Profile"
              color="#4CAF50"
              
            />
            <MenuItem
              icon="lock-closed-outline"
              label="Change Password"
              color="#FF9800"
              
            />
            <MenuItem
              icon="mail-outline"
              label="Email Preferences"
              color="#2196F3"
              
            />
            <MenuItem
              icon="shield-checkmark-outline"
              label="Privacy Settings"
              color="#9C27B0"
              
            />
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.sectionTitle}>Your Preferences</Text>

            <MenuItem icon="leaf-outline" label="Veg Mode" color="#4CAF50" />
            <MenuItem
              icon="star-outline"
              label="Personalized Rating"
              color="#FFC107"
            />
            <MenuItem
              icon="color-palette-outline"
              label="Appearance"
              color="#9C27B0"
            />
            <MenuItem
              icon="card-outline"
              label="Payment Methods"
              color="#2196F3"
            />
            <MenuItem
              icon="notifications-outline"
              label="Notifications"
              color="#FF5722"
            />
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.sectionTitle}>Food Delivery</Text>

            <MenuItem
              icon="receipt-outline"
              label="Your Orders"
              color="#ff7c2b"
            />
            <MenuItem
              icon="location-outline"
              label="Address Book"
              color="#3b82f6"
            />
            <MenuItem
              icon="bookmark-outline"
              label="Your Collection"
              color="#10b981"
            />
            <MenuItem
              icon="settings-outline"
              label="Manage Recommendations"
              color="#8b5cf6"
            />
            <MenuItem
              icon="train-outline"
              label="Order on Train"
              color="#f43f5e"
            />
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.sectionTitle}>Dining & Experiences</Text>
            <MenuItem
              icon="restaurant-outline"
              label="Dining Transactions"
              color="#f59e0b"
            />
            <MenuItem
              icon="trophy-outline"
              label="Dining Rewards"
              color="#ef4444"
            />
            <MenuItem
              icon="calendar-outline"
              label="Table Bookings"
              color="#0ea5e9"
            />
            <MenuItem
              icon="chatbubble-ellipses-outline"
              label="Your Reviews"
              color="#22c55e"
            />
          </View>

          <Pressable
            style={styles.logoutBtn}
            onPress={async () => {
              await AsyncStorage.clear();
              router.replace("../Authentication/Login");
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>

          <Modal
            transparent
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.bottomSheet}>
                <Text style={styles.sheetTitle}>Choose Profile Photo</Text>

                <Pressable
                  style={styles.sheetButton}
                  onPress={() => {
                    setModalVisible(false);
                    camerahandler();
                  }}
                >
                  <View style={styles.row}>
                    <Ionicons name="camera-outline" size={22} color="#000" />
                    <Text style={styles.sheetText}>Take Photo</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={styles.sheetButton}
                  onPress={() => {
                    setModalVisible(false);
                    Galleryhandler();
                  }}
                >
                  <View style={styles.row}>
                    <Ionicons name="image-outline" size={22} color="#000" />
                    <Text style={styles.sheetText}>Choose from Gallery</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={styles.removeButton}
                  onPress={async () => {
                    setimagehandel(null);
                    await AsyncStorage.removeItem("profileImage");
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.row}>
                    <Ionicons name="trash-outline" size={20} color="#ff3b30" />
                    <Text style={styles.removeText}>Remove Profile Photo</Text>
                  </View>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
}

const MenuItem = ({ icon, label, color, onPress }) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>

      <View style={[styles.iconCircle, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>

      <Text style={styles.menuText}>{label}</Text>

    </View>

    <Ionicons name="chevron-forward" size={18} color="#171717" />
  </Pressable>
);


const styles = StyleSheet.create({
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    marginTop: hp("6%"),
  },

  headerTitle: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#000",
  },

  headerIcon: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    paddingTop: hp("1%"),
    paddingBottom: hp("1%"),
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    alignItems: "center",
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  profileImage: {
    width: wp("28%"),
    height: wp("28%"),
    borderRadius: wp("14%"),
    borderWidth: 3,
    borderColor: "#fff",
    borderWidth: 2,
    borderColor: "rgb(255, 176, 65)",
  },

  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#000",
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    marginTop: hp("1.5%"),
    color: "#000000",
  },

  email: {
    fontSize: wp("3.8%"),
    color: "#000000",
    marginTop: hp("0.5%"),
  },

  cardContainer: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: hp("1%"),
    marginTop: hp("3%"),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    paddingHorizontal: wp("8%"),
    paddingVertical: hp("1.5%"),
    color: "#222",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    
  },

  menuText: {
    marginLeft: 15,
    fontSize: wp("4.2%"),
    fontWeight: "500",
    color: "#333",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("4.5%"),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("3%"),
  },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("4%"),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#ff3b30",
    paddingVertical: hp("1.6%"),
    paddingHorizontal: wp("12%"),
    borderRadius: 30,
  },

  logoutText: {
    color: "#ff3b30",
    fontWeight: "600",
    fontSize: wp("4.2%"),
    marginLeft: 8,
  },

  previewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  previewImage: {
    width: wp("90%"),
    height: hp("65%"),
    resizeMode: "contain",
    borderRadius: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  sheetTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },

  sheetButton: {
    paddingVertical: 14,
  },

  sheetText: {
    fontSize: wp("4.5%"),
    marginLeft: 10,
    color: "#333",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  removeButton: {
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },

  removeText: {
    fontSize: wp("4.2%"),
    color: "#ff3b30",
    fontWeight: "600",
    marginLeft: 8,
  },
});
