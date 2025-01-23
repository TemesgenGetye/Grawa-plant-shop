import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import search from "../../../assets/icons/search.png";
import img1 from "../../../assets/images/plant2.png";
import img2 from "../../../assets/images/plant1.png";
import img3 from "../../../assets/images/plant3.png";
import img4 from "../../../assets/images/plant4.png";
import img5 from "../../../assets/images/plant5.png";
import { Link, Redirect, router, useFocusEffect, useRouter } from "expo-router";
import { useGlobalContext } from "../../../context/GlobalProvider";
import React, { useEffect, useState } from "react";
import {
  addFavouritePlant,
  getAllPlants,
  updateCartPlant,
  updateFavouritePlant,
} from "../../../lib/appwrite";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function home() {
  const [plant, setPlant] = useState([]);
  const [filteringValues, setFilteringValues] = useState("all");
  const [filterdPlant, setFilterdPlant] = useState([]);

  async function fetchAllPlants() {
    try {
      const response = await getAllPlants();
      setPlant(response);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchAllPlants();
    }, [])
  );

  useEffect(() => {
    if (filteringValues === "all") setFilterdPlant(() => plant);
    if (filteringValues === "indoor")
      setFilterdPlant(() =>
        plant.filter((item) => item.temprature.includes("5"))
      );
    if (filteringValues === "outdoor")
      setFilterdPlant(() =>
        plant.filter((item) => item.temprature.includes("0"))
      );
    if (filteringValues === "popular")
      setFilterdPlant(() => plant.filter((item) => item.price > 4000));
  }, [plant, filteringValues]);

  async function handelFavourite(id) {
    try {
      await updateFavouritePlant(id);
      fetchAllPlants();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddCart(id) {
    try {
      const reponce = await updateCartPlant(id);
      console.log(reponce);
      fetchAllPlants();
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPlants();
  }, []);

  return (
    <View className="flex-1 bg-[#F8FAF7]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-12">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-3xl font-bold text-gray-800">
                Find your
              </Text>
              <Text className="text-3xl font-bold text-gray-800">
                favorite plants
              </Text>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
              <Image source={search} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>

          <View className="bg-[#E1EDD9] rounded-3xl p-6 mb-6">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-3xl font-bold text-gray-800">
                  30% OFF
                </Text>
                <Text className="text-gray-600 mt-1">02 - 23 July</Text>
              </View>
              <Image source={img1} className="w-24 h-24" resizeMode="contain" />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-4 mb-6"
          >
            {/* All Filter Button */}
            <TouchableOpacity
              className={`px-6 py-2 rounded-full ${
                filteringValues === "all"
                  ? "bg-black"
                  : "bg-white border border-gray-300"
              }`}
              onPress={() => setFilteringValues("all")}
            >
              <Text
                className={`text-center font-semibold ${
                  filteringValues === "all" ? "text-white" : "text-gray-500"
                }`}
              >
                All
              </Text>
            </TouchableOpacity>

            {/* Indoor Filter Button */}
            <TouchableOpacity
              className={`px-6 py-2 rounded-full ${
                filteringValues === "indoor"
                  ? "bg-black"
                  : "bg-white border border-gray-300"
              }`}
              onPress={() => setFilteringValues("indoor")}
            >
              <Text
                className={`text-center font-semibold ${
                  filteringValues === "indoor" ? "text-white" : "text-gray-500"
                }`}
              >
                Indoor
              </Text>
            </TouchableOpacity>

            {/* Outdoor Filter Button */}
            <TouchableOpacity
              className={`px-6 py-2 rounded-full ${
                filteringValues === "outdoor"
                  ? "bg-black"
                  : "bg-white border border-gray-300"
              }`}
              onPress={() => setFilteringValues("outdoor")}
            >
              <Text
                className={`text-center font-semibold ${
                  filteringValues === "outdoor" ? "text-white" : "text-gray-500"
                }`}
              >
                Outdoor
              </Text>
            </TouchableOpacity>

            {/* Popular Filter Button */}
            <TouchableOpacity
              className={`px-6 py-2 rounded-full ${
                filteringValues === "popular"
                  ? "bg-black"
                  : "bg-white border border-gray-300"
              }`}
              onPress={() => setFilteringValues("popular")}
            >
              <Text
                className={`text-center font-semibold ${
                  filteringValues === "popular" ? "text-white" : "text-gray-500"
                }`}
              >
                Popular
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <View className="flex-row flex-wrap justify-between">
            {filterdPlant.map((item) => (
              <Link
                href={`./detail/${item.$id}`}
                key={item.$id}
                className="w-[48%] mb-4"
              >
                <View className="bg-white rounded-3xl p-8">
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    className="w-full h-32 rounded-2xl mb-3"
                    resizeMode="cover"
                  />
                  <Text className="text-base font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-emerald-600 font-bold mb-3">
                    {item.price} birr
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <TouchableOpacity
                      className="bg-emerald-500 p-1 rounded-xl flex-row items-center justify-center gap-1"
                      onPress={() => handleAddCart(item.$id)}
                    >
                      <Text className="text-white text-center text-sm">
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm"
                      onPress={() => handelFavourite(item.$id)}
                    >
                      <Ionicons
                        name="heart"
                        size={24}
                        color={`${item.is_fav ? "#ab0c0c" : "#dedede"}`}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#b3b3b3" style="light" />
    </View>
  );
}
