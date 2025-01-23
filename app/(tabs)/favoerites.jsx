import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import search from "../../assets/icons/search.png";
import img1 from "../../assets/images/plant2.png";
import img2 from "../../assets/images/plant1.png";
import img3 from "../../assets/images/plant3.png";
import img4 from "../../assets/images/plant4.png";
import img5 from "../../assets/images/plant5.png";
import { Link, useFocusEffect } from "expo-router";
import { icons } from "../../constants";
import {
  getAllPlants,
  getFavoritePlants,
  updateUnfavouritePlant,
} from "../../lib/appwrite";
import React, { useEffect, useState } from "react";
import { Loader } from "../../components";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Favorites() {
  const [favouritePlants, setFavouritePlants] = useState([]);
  const [allPlants, setAllPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllPlants() {
    try {
      setLoading(true);
      const response = await getAllPlants();
      setAllPlants(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function handelUnFavourite(id) {
    try {
      const responce = await updateUnfavouritePlant(id);
      fetchAllPlants();
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
    fetchAllPlants();
  }, []);

  const filterdPlant = allPlants.filter((plant) => plant.is_fav);
  console.log(filterdPlant);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <View className="flex-1 bg-[#F8FAF7]">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-12">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-gray-800">Favorites</Text>
            <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm">
              <Image source={search} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>

          {filterdPlant.length === 0 && (
            <Text className="text-center text-gray-500">
              No favorite plants found 😭.
            </Text>
          )}

          <View className="flex-row flex-wrap justify-center items-center gap-1">
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
                    <TouchableOpacity className="bg-emerald-500 p-1 rounded-xl flex-row items-center justify-center gap-1">
                      <Text className="text-white text-center text-sm">
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm"
                      onPress={() => handelUnFavourite(item.$id)}
                    >
                      <Ionicons name="heart" size={24} color="#940000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
