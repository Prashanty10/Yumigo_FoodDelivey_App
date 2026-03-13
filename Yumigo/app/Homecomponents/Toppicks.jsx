import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import api from "../Api/Api";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Toppicks() {
  const [toppicks, setToppicks] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const router = useRouter();

  const getToppicks = async () => {
    try {
      const res = await api.get("/toppicks");
      setToppicks(res.data);
    } catch (error) {
      console.log("Top Picks Error:", error);
    }
  };

  useEffect(() => {
    getToppicks();
  }, []);

  const renderItem = ({ item }) => {
    const toggleLike = (id) => {
      setLikedItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          router.push({
            pathname: "../Restaurantcomponents/Menuitem",
            params: { id: item._id },
          });
        }}
      >
        <Image source={{ uri: item.foodimage }} style={styles.image} />

        <Pressable
          style={styles.heartIcon}
          onPress={() => toggleLike(item._id)}
        >
          {likedItems[item._id] ? (
            <Ionicons name="heart" size={22} color="#ff3b30" />
          ) : (
            <Ionicons name="heart-outline" size={22} color="#ff3b30" />
          )}
        </Pressable>

        <View style={styles.infoContainer}>
          <View style={styles.rowBetween}>
            <View style={styles.leftSection}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.reviews}>({item.totalReviews} reviews)</Text>
            </View>

            <View style={styles.rightSection}>
              <Text style={styles.meta}>{item.deliveryTime}</Text>
              <Text style={styles.meta}>{item.distance}</Text>
              <Text style={styles.price}>{item.priceRange}</Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#16a34a" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Picks For You</Text>

      <FlatList
        data={toppicks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp(1),
    paddingHorizontal: 10,
  },

  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: hp(2),
    marginTop: 20,
  },

  card: {
    width: wp("80%"),
    marginLeft: wp(4),
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 6,
    overflow: "hidden",
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: hp("22%"),
  },

  heartIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
  },

  infoContainer: {
    padding: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  leftSection: {
    width: "65%",
  },

  rightSection: {
    alignItems: "flex-end",
  },

  name: {
    fontSize: hp(2),
    fontWeight: "bold",
  },

  description: {
    color: "#666",
    marginTop: 3,
  },

  reviews: {
    color: "#777",
    marginTop: 3,
  },

  meta: {
    color: "#333",
    marginBottom: 4,
  },

  price: {
    fontWeight: "600",
    fontSize: 16,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  ratingText: {
    marginLeft: 4,
    fontWeight: "600",
    color: "#16a34a",
  },
});
