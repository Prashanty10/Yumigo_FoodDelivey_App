import React, { memo, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import api from "../Api/Api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";

const MenuCard = memo(({ item, cartItems, setCartItems }) => {
  const quantity =
    cartItems.find((i) => i._id === item._id)?.quantity || 0;

  const handleCart = (action) => {
    setCartItems((prev) => {
      let cart = [...prev];
      const index = cart.findIndex((i) => i._id === item._id);

      if (index > -1) {
        if (action === "increase") {
          cart[index].quantity += 1;
        }
        if (action === "decrease") {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            cart.splice(index, 1);
          }
        }
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      return cart;
    });
  };

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={styles.vegRow}>
          <View
            style={[
              styles.vegIndicator,
              { borderColor: item.isVeg ? "green" : "red" },
            ]}
          >
            <View
              style={[
                styles.vegDot,
                { backgroundColor: item.isVeg ? "green" : "red" },
              ]}
            />
          </View>
        </View>

        <Text style={styles.foodName}>{item.name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#33b522" />
          <Text style={{color:"#33b522"}}>{item.rating}</Text>
        </View>

        <Text style={styles.price}>₹ {item.price}</Text>

        <Text numberOfLines={2} style={styles.desc}>
          {item.description}
        </Text>

        <Text numberOfLines={1} style={styles.ingredients}>
          {item.ingredients?.join(", ")}
        </Text>

        <View style={styles.buttonRow}>
          <Pressable>
            <Ionicons name="bookmark-outline" size={20} color="#444" />
          </Pressable>

          <Pressable>
            <Ionicons name="share-social-outline" size={20} color="#444" />
          </Pressable>
        </View>
      </View>

      <View>
        <Image source={{ uri: item.image }} style={styles.foodImage} />

        {quantity > 0 ? (
          <View style={styles.counter}>
            <Pressable onPress={() => handleCart("decrease")}>
              <Text style={styles.counterBtn}>-</Text>
            </Pressable>

            <Text style={styles.counterText}>{quantity}</Text>

            <Pressable onPress={() => handleCart("increase")}>
              <Text style={styles.counterBtn}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.addBtn}
            onPress={() => handleCart("increase")}
          >
            <Text style={styles.addText}>ADD</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
});

const MenuItem = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/Menu/${id}`);
        setMenu(res.data);
        setRestaurant(res.data[0]?.restaurant);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, [id]);

  const renderItem = useCallback(({ item }) => {
    return (
      <MenuCard
        item={item}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    );
  }, [cartItems]);

  return (
    <View style={styles.container}>
      {restaurant && (
        <View style={styles.header}>
          <Image
            source={{ uri: restaurant.mainImage }}
            style={styles.headerImage}
          />

          <View style={styles.topBar}>
            <Pressable style={styles.iconCircle} onPress={() => router.back("../Screens/Home")}>
              <Ionicons name="arrow-back" size={20} color="#000" />
            </Pressable>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="gray" />
              <TextInput
                placeholder={restaurant.name}
                style={styles.searchInput}
              />
            </View>

            <Pressable style={styles.iconCircle}>
              <Ionicons name="heart-outline" size={20} color="#000" />
            </Pressable>
          </View>
        </View>
      )}

      {restaurant && (
        <View style={styles.restaurantInfo}>
          <View style={styles.topRow}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>

            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#fff" />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <Ionicons name="time-outline" size={14} color="gray" />
            <Text style={styles.restaurantDetails}>
              {restaurant.deliveryTime}
            </Text>

            <Text style={styles.dot}>•</Text>

            <Ionicons name="location-outline" size={14} color="gray" />
            <Text style={styles.restaurantDetails}>{restaurant.distance}</Text>

            <Text style={styles.dot}>•</Text>

            <Ionicons name="cash-outline" size={14} color="gray" />
            <Text style={styles.restaurantDetails}>₹₹</Text>
          </View>

          {restaurant.cuisine && (
            <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
          )}

          <Text style={styles.restaurantDesc}>{restaurant.description}</Text>
        </View>
      )}

      <FlatList
        data={menu}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: hp(12) }}
      />

      {cartItems.length > 0 && (
        <Pressable
          style={styles.cartBar}
          onPress={() =>
            router.push({
              pathname: "./Placeorder",
              params: { cart: JSON.stringify(cartItems) },
            })
          }
        >
          <Text style={styles.cartText}>
            🛒 {cartItems.length} Items | Proceed to Cart
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: hp(35),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topBar: {
    position: "absolute",
    top: hp(6),
    left: wp(4),
    right: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: wp(3),
    paddingHorizontal: wp(3),
    borderRadius: 30,
    height: hp(5),
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
  },
  restaurantInfo: {
    padding: wp(4),
    backgroundColor: "#fff",
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: "700",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00a86b",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 3,
    fontWeight: "700",
    fontSize: 12,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  restaurantDetails: {
    color: "gray",
    marginLeft: 3,
    marginRight: 6,
    fontSize: 13,
  },
  dot: {
    marginHorizontal: 4,
    color: "gray",
  },
  cuisine: {
    marginTop: 6,
    color: "#555",
    fontSize: 13,
  },
  restaurantDesc: {
    marginTop: 6,
    color: "#666",
    fontSize: 13,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: wp(4),
    marginTop: hp(1.5),
    padding: wp(4),
    borderRadius: 12,
    elevation: 3,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  price: {
    marginTop: 4,
    fontWeight: "600",
  },
  desc: {
    color: "#666",
    marginTop: 4,
  },
  ingredients: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },
  foodImage: {
    width: wp(32),
    height: hp(15),
    borderRadius: 10,
  },
  addBtn: {
    position: "absolute",
    bottom: -8,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#00a86b",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addText: {
    color: "#00a86b",
    fontWeight: "700",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#00a86b",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    gap: 2,
    marginTop: 4,
  },
  counterBtn: {
    fontSize: 20,
    color: "#00a86b",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  counterText: {
    fontWeight: "700",
    marginHorizontal: 6,
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  vegRow: {
    marginBottom: 4,
  },
  vegIndicator: {
    width: 16,
    height: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cartBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#00a86b",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },
  cartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});