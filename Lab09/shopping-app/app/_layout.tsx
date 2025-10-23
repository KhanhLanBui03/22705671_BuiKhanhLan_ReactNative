import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Trang chủ" }} />
      <Stack.Screen name="cart" options={{ title: "Giỏ hàng" }} />
      <Stack.Screen name="invoice" options={{ title: "Hóa đơn" }} />
    </Stack>
  );
}
