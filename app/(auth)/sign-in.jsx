import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import img1 from "../../assets/images/plant2.png";
import { signIn } from "../../lib/appwrite";
import { Loader } from "../../components";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLogged, loading: isLoading } = useGlobalContext();

  const handleSignIn = async () => {
    if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters");
      return;
    }
    if (email.includes("@") == false) {
      Alert.alert("Please enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      const response = await signIn(email, password);
      console.log("response", response);
      if (response) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#F8FAF7]"
    >
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View className="items-center mt-20 mb-10">
          <Image
            source={img1}
            className="w-28 h-28 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-sm text-gray-500 tracking-wider mt-4">ግራዋ</Text>
        </View>

        <View className="px-8">
          <View className="mb-10">
            <Text className="text-3xl font-bold text-gray-800 text-center">
              Welcome back
            </Text>
            <Text className="text-gray-500 text-center mt-3">
              Sign in to continue your green journey
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <TextInput
                placeholder="Email address"
                className="bg-white px-4 py-3.5 rounded-xl text-gray-800 border border-gray-100"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View>
              <TextInput
                placeholder="Password"
                className="bg-white px-4 py-3.5 rounded-xl text-gray-800 border border-gray-100"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <TouchableOpacity className="items-end">
              <Text className="text-emerald-600 font-medium">
                Forgot password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-emerald-500 rounded-xl h-14 items-center justify-center mt-6"
              onPress={handleSignIn}
            >
              <Text className="text-white text-lg font-semibold">Sign In</Text>
            </TouchableOpacity>

            {/* <View className="mt-8">
              <View className="flex-row items-center">
                <View className="flex-1 h-[1px] bg-gray-200" />
                <Text className="mx-4 text-gray-400">or continue with</Text>
                <View className="flex-1 h-[1px] bg-gray-200" />
              </View>

              <View className="flex-row justify-center space-x-6 mt-6">
                <TouchableOpacity className="w-14 h-14 bg-white rounded-full items-center justify-center border border-gray-100">
                  <Text className="text-2xl">🌐</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-14 h-14 bg-white rounded-full items-center justify-center border border-gray-100">
                  <Text className="text-2xl">📱</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            <View className="flex-row justify-center space-x-1 mt-8 mb-8">
              <Text className="text-gray-600">Don't have an account?</Text>
              <Link href={"/sign-up"}>
                <Text className="text-emerald-600 font-medium">Sign up</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#b3b3b3" style="light" />
    </KeyboardAvoidingView>
  );
}
