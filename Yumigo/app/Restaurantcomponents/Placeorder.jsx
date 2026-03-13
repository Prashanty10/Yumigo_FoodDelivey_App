import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function PlaceOrder() {
  const router = useRouter();
  const { cart } = useLocalSearchParams();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(false);

  const [address, setAddress] = useState(
    "Flat 204, Green Residency, Palghar, Maharashtra 401404"
  );

  useEffect(() => {
    if (cart) {
      const items = JSON.parse(cart);
      setCartItems(items);

      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setTotal(totalPrice);
    }
  }, []);

  const handlePlaceOrder = () => {
    setSuccess(true);

    setTimeout(() => {
      router.replace({
        pathname: "../Screens/Order",
        params: {
          order: JSON.stringify(cartItems),
          total: total,
          address: address,
        },
      });
    }, 2000);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹ {item.price}</Text>
          <Text style={styles.qty}>Qty: {item.quantity}</Text>
        </View>

        <Text style={styles.itemTotal}>
          ₹ {item.price * item.quantity}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.header}>Place Order</Text>

        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />

        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Delivery Address</Text>

          <TextInput
            multiline
            numberOfLines={3}
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={{ height: hp(10) }} />
      </ScrollView>

      <View style={styles.bottom}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.total}>₹ {total}</Text>
        </View>

        <Pressable style={styles.orderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.orderText}>Confirm Order</Text>
        </Pressable>
      </View>

      <Modal visible={success} transparent animationType="fade">
        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <Ionicons name="checkmark-circle" size={70} color="#00a86b" />
            <Text style={styles.successText}>Order Placed Successfully</Text>
            <Text style={styles.successSub}>Preparing your food...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: hp(5),
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: wp(4),
    marginBottom: hp(2),
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    marginBottom: hp(1.5),
    borderRadius: 10,
    padding: wp(3),
    alignItems: "center",
    elevation: 2,
  },

  image: {
    width: wp(18),
    height: hp(8),
    borderRadius: 8,
  },

  details: {
    flex: 1,
    marginLeft: wp(3),
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
  },

  price: {
    marginTop: 2,
    color: "#444",
  },

  qty: {
    marginTop: 2,
    color: "gray",
  },

  itemTotal: {
    fontWeight: "700",
  },

  addressBox: {
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    padding: wp(4),
    borderRadius: 10,
    marginBottom: hp(2),
  },

  addressLabel: {
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: hp(6),
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(4),
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },

  totalLabel: {
    color: "gray",
  },

  total: {
    fontSize: 18,
    fontWeight: "700",
  },

  orderBtn: {
    backgroundColor: "#00a86b",
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.2),
    borderRadius: 8,
  },

  orderText: {
    color: "#fff",
    fontWeight: "600",
  },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
  },

  successText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  successSub: {
    color: "gray",
    marginTop: 4,
  },
});