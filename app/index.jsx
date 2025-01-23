import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity } from "react-native";
import plant from "../assets/images/plant1.png";
import { Link, Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { Loader } from "../components";
import { useEffect } from "react";

export default function App() {
  const { isLogged, loading } = useGlobalContext();
  if (!loading && isLogged) return <Redirect href="/home" />;
  if (loading) return <Loader isLoading={loading} />;
  return (
    <View className="flex-1 bg-gray-50 p-6">
      <StatusBar style="dark" />

      <View className="absolute top-8 left-6">
        <Text className="text-sm text-gray-500 tracking-wider">ግራዋ</Text>
      </View>

      <View className="flex-1 justify-between pt-20">
        <View>
          <Text className="text-[40px] leading-tight font-bold">
            Plant a{"\n"}tree for{"\n"}life
          </Text>
        </View>

        <View className="items-center mb-8">
          <Image source={plant} className="w-72 h-72" resizeMode="contain" />
        </View>

        <View className="mb-8">
          <Text className="text-center text-lg mb-12">
            Home Plant delivery{"\n"} and Shop
          </Text>

          <Link
            className="bg-teal-500 rounded-full w-20 h-20 items-center justify-center self-center text-white text-xl font-semibold text-center pt-5"
            href="/sign-in"
          >
            GO
          </Link>
        </View>
      </View>
    </View>
  );
}
