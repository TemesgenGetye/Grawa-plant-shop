import { StatusBar } from "expo-status-bar";
import {
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
  Text,
  ScrollView,
  Image,
} from "react-native";

import img1 from "../assets/images/plant2.png";

const Loader = ({ isLoading }) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View className="flex-1 bg-[#F8FAF7] items-center justify-center flex">
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-48 mb-8 flex justify-center">
          <Text className="text-sm text-gray-500 tracking-wider mt-4">ግራዋ</Text>

          <Image source={img1} className="w-24 h-24 mb-4" />
          <ActivityIndicator size="large" color="#007228e1" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Loader;
