import { Stack } from "expo-router";

function Home_Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="detail/[id]"
        options={{ headerShown: true, title: "Detail" }}
      />
    </Stack>
  );
}

export default Home_Layout;
