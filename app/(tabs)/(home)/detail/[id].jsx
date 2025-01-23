import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import img1 from "../../../../assets/images/plant2.png";
import img2 from "../../../../assets/images/plant1.png";
import img3 from "../../../../assets/images/plant3.png";
import img4 from "../../../../assets/images/plant4.png";
import img5 from "../../../../assets/images/plant5.png";
import { getPlantById } from "../../../../lib/appwrite";
import { Loader } from "../../../../components";

export default function DetailPage() {
  const { id } = useLocalSearchParams();
  const [plant, setPlant] = useState([]);
  const [isLoaing, setIsLoading] = useState(false);
  console.log(id);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        const response = await getPlantById(id);
        setPlant(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, []);

  const CareItem = ({ icon, label, value }) => (
    <View className="flex-row items-center mb-4">
      <Ionicons name={icon} size={24} color="#10B981" />
      <View className="ml-3">
        <Text className="text-gray-600">{label}</Text>
        <Text className="text-gray-800 font-semibold">{value}</Text>
      </View>
    </View>
  );

  if (isLoaing) return <Loader isLoading={isLoaing} />;

  return (
    <View className="flex-1 bg-[#F8FAF7]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: plant.image }}
          className="w-full h-80"
          resizeMode="cover"
        />
        <View className="px-6 pt-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            {plant.name}
          </Text>
          <Text className="text-xl font-bold text-emerald-600 mb-4">
            {plant.price} {"birr"}
          </Text>
          <Text className="text-gray-600 mb-6">{plant.description}</Text>

          <Text className="text-xl font-bold text-gray-800 mb-4">
            Plant Care
          </Text>
          <CareItem
            icon="leaf-outline"
            label="Care Level"
            value={"Easy to moderate"}
          />
          <CareItem
            icon="sunny-outline"
            label="Light"
            value={"Bright, indirect light"}
          />
          <CareItem
            icon="water-outline"
            label="Watering"
            value={"Weekly, allow soil to dry slightly"}
          />
          <CareItem
            icon="thermometer-outline"
            label="Temperature"
            value={plant.temprature + "°C"}
          />

          <TouchableOpacity
            className="bg-emerald-600 py-4 px-6 rounded-full mt-6 mb-8"
            onPress={() => alert("Added to cart!")}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
