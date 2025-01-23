import { Link } from "expo-router";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import img1 from "../../assets/images/plant2.png";
import { router } from "expo-router";
import { useState } from "react";
import { Loader } from "../../components";
import { createUser } from "../../lib/appwrite";

export default function App() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirm_password) {
      Alert.alert("Passwords do not match");
      return;
    }
    if (first_name.length < 2 || last_name.length < 2 || email.length < 2) {
      Alert.alert("Please fill all fields");
      return;
    }
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
      const response = await createUser(email, password, first_name, last_name);
      console.log(response);
      if (response) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader isLoading={loading} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#F8FAF7]"
    >
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-16 mb-8">
          <Image
            source={img1}
            className="w-24 h-24 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-sm text-gray-500 tracking-wider mt-4">ግራዋ</Text>
        </View>

        <View className="px-8">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-800 text-center">
              Join our{"\n"}green community
            </Text>
            <Text className="text-gray-500 text-center mt-3">
              Create an account to start your plant journey
            </Text>
          </View>

          <View className="space-y-4">
            <View className="flex-row space-x-3">
              <View className="flex-1">
                <TextInput
                  placeholder="First name"
                  className="bg-white px-4 py-3.5 rounded-xl text-gray-800 border border-gray-100"
                  placeholderTextColor="#94a3b8"
                  onChangeText={(text) => setFirstName(text)}
                />
              </View>
              <View className="flex-1">
                <TextInput
                  placeholder="Last name"
                  className="bg-white px-4 py-3.5 rounded-xl text-gray-800 border border-gray-100"
                  placeholderTextColor="#94a3b8"
                  onChangeText={(text) => setLastName(text)}
                />
              </View>
            </View>

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
                placeholder="Create password"
                className="bg-white px-4 py-3.5 rounded-xl text-gray-800 border border-gray-100"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View>
              <TextInput
                placeholder="Confirm password"
                className="bg-white px-4 py-3.5 rounded-xl text-gray-800 border border-gray-100"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>

            <View className="flex-row items-center justify-center mt-2">
              <Text className="text-gray-500 text-sm text-center">
                By signing up, you agree to our{" "}
                <Text className="text-emerald-600 font-medium">Terms</Text> and{" "}
                <Text className="text-emerald-600 font-medium">
                  Privacy Policy
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              className="bg-emerald-500 rounded-xl h-14 items-center justify-center mt-4"
              onPress={handleSignUp}
            >
              <Text className="text-white text-lg font-semibold">
                Create Account
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center space-x-1 mt-4 mb-8">
              <Text className="text-gray-600">Already have an account?</Text>
              <Link href={"/sign-in"}>
                <Text className="text-emerald-600 font-medium">Sign in</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#b3b3b3" style="light" />
    </KeyboardAvoidingView>
  );
}
