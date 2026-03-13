import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Order() {
  const { order, total, address } = useLocalSearchParams();

  const items = order ? JSON.parse(order) : [];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.qty}>Qty: {item.quantity}</Text>
        </View>

        <Text style={styles.price}>
          ₹ {item.price * item.quantity}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Your Order 📦</Text>

      <View style={styles.statusBox}>
        <Text style={styles.status}>Preparing your food 🍽️</Text>
        <Text style={styles.subStatus}>
          Your order will be delivered soon
        </Text>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: hp(12) }}
      />

      <View style={styles.addressBox}>
        <Text style={styles.label}>Delivery Address</Text>
        <Text style={styles.address}>{address}</Text>
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total Paid</Text>
        <Text style={styles.total}>₹ {total}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f5f5f5",
    paddingTop:hp(5)
  },

  header:{
    fontSize:22,
    fontWeight:"700",
    marginLeft:wp(4),
    marginBottom:hp(2)
  },

  statusBox:{
    backgroundColor:"#fff",
    marginHorizontal:wp(4),
    padding:wp(4),
    borderRadius:10,
    marginBottom:hp(2)
  },

  status:{
    fontSize:16,
    fontWeight:"600"
  },

  subStatus:{
    color:"gray",
    marginTop:4
  },

  card:{
    flexDirection:"row",
    backgroundColor:"#fff",
    marginHorizontal:wp(4),
    marginBottom:hp(1.5),
    borderRadius:10,
    padding:wp(3),
    alignItems:"center",
    elevation:2
  },

  image:{
    width:wp(18),
    height:hp(8),
    borderRadius:8
  },

  details:{
    flex:1,
    marginLeft:wp(3)
  },

  name:{
    fontSize:15,
    fontWeight:"600"
  },

  qty:{
    marginTop:2,
    color:"gray"
  },

  price:{
    fontWeight:"700"
  },

  addressBox:{
    backgroundColor:"#fff",
    marginHorizontal:wp(4),
    padding:wp(4),
    borderRadius:10,
    marginBottom:hp(2)
  },

  label:{
    fontWeight:"600",
    marginBottom:4
  },

  address:{
    color:"#444"
  },

  totalBox:{
    backgroundColor:"#fff",
    marginHorizontal:wp(4),
    padding:wp(4),
    borderRadius:10
  },

  totalLabel:{
    color:"gray"
  },

  total:{
    fontSize:18,
    fontWeight:"700",
    marginTop:2
  }

});