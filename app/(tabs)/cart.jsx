import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { getAllPlants, updateUncartPlant } from "../../lib/appwrite";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function Cart() {
  const [allPlants, setAllPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  const router = useRouter();
  function handleCheckout() {
    Alert.alert("Success", "We will contact you soon");
    router.push("/home");
  }

  async function fetchAllPlants() {
    try {
      const response = await getAllPlants();

      const initialQuantities = response.reduce((acc, plant) => {
        if (plant.is_cart) acc[plant.$id] = 1;
        return acc;
      }, {});

      setAllPlants(response);
      setQuantities(initialQuantities);
    } catch (error) {
      console.log("Error fetching plants:", error);
    }
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchAllPlants();
    }, [])
  );

  function handleIncreaseQuantity(plantId) {
    setQuantities((prev) => ({
      ...prev,
      [plantId]: prev[plantId] + 1,
    }));
  }

  async function handleDecreaseQuantity(plantId) {
    if (quantities[plantId] > 1) {
      setQuantities((prev) => ({
        ...prev,
        [plantId]: prev[plantId] - 1,
      }));
    } else {
      try {
        await updateUncartPlant(plantId);
        fetchAllPlants();
      } catch (error) {
        console.log("Error removing plant from cart:", error);
      }
    }
  }

  const filteredPlants = allPlants.filter((plant) => plant.is_cart);

  const deliveryFee = 2000;
  const subtotal = filteredPlants.reduce(
    (sum, plant) => sum + plant.price * (quantities[plant.$id] || 1),
    0
  );
  const total = subtotal + deliveryFee;

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <View className="flex-1 bg-[#F8FAF7]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="px-6 pt-12">
          <Text className="text-3xl font-bold text-gray-800 mb-6">
            Shopping Cart
          </Text>

          {/* Cart Items */}
          <View className="space-y-4">
            {filteredPlants.length === 0 ? (
              <Text className="text-center text-gray-500">
                No plants found in cart.
              </Text>
            ) : (
              filteredPlants.map((item) => (
                <View
                  className="bg-white p-4 rounded-3xl flex-row"
                  key={item.$id}
                >
                  <Image
                    source={{ uri: item.image }}
                    className="w-24 h-24 rounded-2xl"
                    resizeMode="cover"
                  />
                  <View className="flex-1 ml-4 justify-between">
                    <View>
                      <Text className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </Text>
                      <Text className="text-emerald-600 font-bold">
                        {item.price} birr
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                        onPress={() => handleDecreaseQuantity(item.$id)}
                      >
                        <Text className="text-lg">-</Text>
                      </TouchableOpacity>
                      <Text className="mx-4 font-semibold">
                        {quantities[item.$id] || 1}
                      </Text>
                      <TouchableOpacity
                        className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
                        onPress={() => handleIncreaseQuantity(item.$id)}
                      >
                        <Text className="text-lg">+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Order Summary */}
          {filteredPlants.length > 0 && (
            <View className="bg-white rounded-3xl p-6 mt-6">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </Text>
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Subtotal</Text>
                  <Text className="font-semibold">{subtotal} birr</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Delivery</Text>
                  <Text className="font-semibold">{deliveryFee} birr</Text>
                </View>
                <View className="flex-row justify-between pt-3 border-t border-gray-100">
                  <Text className="font-bold text-lg">Total</Text>
                  <Text className="font-bold text-lg">{total} birr</Text>
                </View>
              </View>
              <TouchableOpacity
                className="bg-emerald-500 py-4 rounded-full mt-6"
                onPress={handleCheckout}
              >
                <Text className="text-white font-semibold text-lg text-center">
                  Checkout
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
