import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import img2 from "../../assets/images/plant1.png";
import { getAllPlants, getCurrentUser, signOut } from "../../lib/appwrite";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import img1 from "../../assets/icon.png";
export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allPlants, setAllPlants] = useState([]);

  async function fetchAllPlants() {
    try {
      const response = await getAllPlants();
      setAllPlants(response);
    } catch (error) {
      console.log("Error fetching plants:", error);
    }
  }

  useEffect(() => {
    async function fetchCurrentUser() {
      setLoading(true);
      try {
        const response = await getCurrentUser();
        setCurrentUser(response);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
      setLoading(false);
    }

    fetchCurrentUser();
    fetchAllPlants();
  }, []);

  const totalCart = allPlants.reduce(
    (sum, plant) => sum + (plant.is_cart ? 1 : 0),
    0
  );
  const totalFavorites = allPlants.reduce(
    (sum, plant) => sum + (plant.is_fav ? 1 : 0),
    0
  );

  if (loading) return <Loader isLoading={loading} />;

  return (
    <View className="flex-1 bg-[#F8FAF7]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Gradient Header Section */}
        <View className="bg-gradient-to-r from-green-400 to-emerald-500 px-6 pt-12 pb-8 rounded-b-3xl">
          <View className="items-center mb-8">
            <Image
              source={img2}
              className="w-24 h-24 rounded-full mb-4"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-600">
              {currentUser?.first_name} {currentUser?.last_name}
            </Text>
            <Text className="text-gray-400 opacity-80">
              {currentUser?.email}
            </Text>
            <Text className="text-gray-400 opacity-80">ግራዋ</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-between bg-white rounded-3xl p-3 mx-6 shadow-md">
          <View className="items-center">
            <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center mb-2">
              <Text>🛒</Text>
            </View>
            <Text className="text-2xl font-bold text-emerald-500">
              {totalCart}
            </Text>
            <Text className="text-gray-500">Cart</Text>
          </View>
          <View className="items-center">
            <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center mb-2">
              <Text>❤️</Text>
            </View>
            <Text className="text-2xl font-bold text-emerald-500">
              {totalFavorites}
            </Text>
            <Text className="text-gray-500">Favorites</Text>
          </View>
          <View className="items-center">
            <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center mb-2">
              <Text>🌱</Text>
            </View>
            <Text className="text-2xl font-bold text-emerald-500">
              {allPlants.length}
            </Text>
            <Text className="text-gray-500">All Plants</Text>
          </View>
        </View>

        <View className="bg-emerald-50 mx-6 p-4 rounded-2xl shadow-md mt-2">
          <Text className="text-lg text-gray-800 font-medium mb-2">
            🌿 Keep Growing 🌿
          </Text>
          <Text className="text-gray-600 text-sm">
            “To plant a garden is to believe in tomorrow.”
          </Text>
        </View>

        <Text className="text-gray-400 opacity-80 text-center text-6xl p-14">
          ግራዋ
        </Text>

        <TouchableOpacity
          className="flex-row items-center bg-red-500 p-4 rounded-2xl mx-6"
          onPress={() => {
            signOut();
            router.push("/sign-in");
          }}
        >
          <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4">
            <Text>🚪</Text>
          </View>
          <Text className="flex-1 text-lg text-white font-medium">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
