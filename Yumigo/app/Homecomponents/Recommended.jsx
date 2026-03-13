import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";

import api from "../Api/Api";
import Ionicons from "react-native-vector-icons/Ionicons";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const width = Dimensions.get("window").width;

const RestaurantCard = memo(({ item, likedItems, toggleLike }) => {
  const ref = useRef(null);
  const progress = useSharedValue(0);
  const router = useRouter();
  const liked = likedItems[item._id];

  const onPressPagination = (index) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <Pressable  style={styles.card} onPress={() => {
          router.push({
            pathname: "../Restaurantcomponents/Menuitem",
            params: { id: item._id },
          });
        }}>
      <Carousel
        ref={ref}
        width={wp("95%")}
        height={hp("30%")}
        data={item.images}
        autoPlay
        loop
        onProgressChange={progress}
        renderItem={({ item: image }) => (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={item.images}
        dotStyle={styles.dot}
        containerStyle={styles.pagination}
        onPress={onPressPagination}
      />

      <View style={styles.ratingBox}>
        <Ionicons name="star" size={14} color="#1ca717" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>

      <Pressable style={styles.heartIcon} onPress={() => toggleLike(item._id)}>
        {liked ? (
          <Ionicons name="heart" size={22} color="#ff3b30" />
        ) : (
          <Ionicons name="heart-outline" size={22} color="#ff3b30" />
        )}
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.row}>
          <Text style={styles.meta}>{item.deliveryTime}</Text>
          <Text style={styles.meta}>{item.distance}</Text>
          <Text style={styles.reviewText}>Review ({item.totalReviews})</Text>
        </View>

        <Text style={styles.price}>{item.priceRange}</Text>
      </View>
    </Pressable>
  );
});

export default function Recommended() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [likedItems, setLikedItems] = useState({});

  const getRecommended = async () => {
    try {
      const res = await api.get("/recommended");
      setRestaurants(res.data);
    } catch (error) {
      console.log("Recommended Error:", error);
    }
  };

  useEffect(() => {
    getRecommended();
  }, []);

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        
      >
        <RestaurantCard
          item={item}
          likedItems={likedItems}
          toggleLike={toggleLike}
        />
      </Pressable>
    ),
    [likedItems],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended For You</Text>

      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },

  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    elevation: 6,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: hp("30%"),
  },

  pagination: {
    position: "absolute",
    top: hp("31%"),
    alignSelf: "center",
    gap: 5,
  },

  dot: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 50,
    width: 7,
    height: 7,
  },

  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 12,
    right: 12,
  },

  ratingText: {
    color: "#359200",
    marginLeft: 3,
    fontSize: 16,
    fontWeight: "600",
  },

  info: {
    padding: 12,
  },

  name: {
    fontSize: hp(2.2),
    fontWeight: "bold",
  },

  desc: {
    color: "#666",
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    marginTop: 6,
  },

  reviewText: {
    color: "#777",
  },

  meta: {
    marginRight: 15,
    color: "#333",
  },

  price: {
    marginTop: 6,
    fontWeight: "600",
    fontSize: 15,
  },
});
