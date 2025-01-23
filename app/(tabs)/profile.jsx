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
import { router, useFocusEffect } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allPlants, setAllPlants] = useState([]);

  async function fetchAllPlants() {
    try {
      const response = await getAllPlants();
      setAllPlants(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchCurrentUser() {
      setLoading(true);
      try {
        const response = await getCurrentUser();
        setCurrentUser(response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    fetchCurrentUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAllPlants();
    }, [])
  );

  useEffect(() => {
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

  function handeleError() {
    Alert.alert("Notice", "This feature is not available yet.");
  }

  if (loading) return <Loader isLoading={loading} />;
  return (
    <View className="flex-1 bg-[#F8FAF7]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="px-6 pt-12">
          <View className="items-center mb-8">
            <Image
              source={img2}
              className="w-24 h-24 rounded-full mb-4"
              resizeMode="cover"
            />
            <Text className="text-2xl font-bold text-gray-800">
              {currentUser?.first_name} {currentUser?.last_name}
            </Text>
            <Text className="text-gray-500">{currentUser?.email}</Text>
          </View>

          <View className="flex-row justify-between bg-white rounded-3xl p-6 mb-6">
            <View className="items-center">
              <Text className="text-2xl font-bold text-emerald-500">
                {totalCart}
              </Text>
              <Text className="text-gray-500">Cart</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-emerald-500">
                {totalFavorites}
              </Text>
              <Text className="text-gray-500">Favourites</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-emerald-500">
                {allPlants.length}
              </Text>
              <Text className="text-gray-500">All plants</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="space-y-4">
            <TouchableOpacity
              className="flex-row items-center bg-white p-4 rounded-2xl"
              onPress={handeleError}
            >
              <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-4">
                <Text>📦</Text>
              </View>
              <Text className="flex-1 text-lg text-gray-800">My Orders</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white p-4 rounded-2xl"
              onPress={handeleError}
            >
              <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-4">
                <Text>🏠</Text>
              </View>
              <Text className="flex-1 text-lg text-gray-800">
                Shipping Address
              </Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white p-4 rounded-2xl
            "
              onPress={handeleError}
            >
              <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-4">
                <Text>💳</Text>
              </View>
              <Text className="flex-1 text-lg text-gray-800">
                Payment Methods
              </Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white p-4 rounded-2xl"
              onPress={handeleError}
            >
              <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-4">
                <Text>⚙️</Text>
              </View>
              <Text className="flex-1 text-lg text-gray-800">Settings</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center bg-white p-4 rounded-2xl"
              onPress={() => {
                signOut();
                router.push("/sign-in");
              }}
            >
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-4">
                <Text>🚪</Text>
              </View>
              <Text className="flex-1 text-lg text-red-500">Logout</Text>
              <Text className="text-gray-400">→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
