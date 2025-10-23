import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import initDB from "../database/db";

type InvoiceItem = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function Invoice() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadInvoice();
  }, []);
  const loadInvoice = async () => {
    const db = await initDB();

    const rows = await db.getAllAsync<InvoiceItem>(`
      SELECT p.id as product_id, p.name, p.price, c.quantity
      FROM cart c
      JOIN products p ON c.product_id = p.id
    `);

    setItems(rows);

    const totalAmount = rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };
  const handleCheckout = async () => {
    const db = await initDB();

    const lowStock = await db.getAllAsync<{ name: string; stock: number; quantity: number }>(`
      SELECT p.name, p.stock, c.quantity
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE p.stock < c.quantity
    `);

    if (lowStock.length > 0) {
      const names = lowStock
        .map((x) => `${x.name} (còn ${x.stock})`)
        .join(", ");
      Alert.alert("Không đủ hàng", `Các sản phẩm sau không đủ tồn: ${names}`);
      return;
    }

    const cartItems = await db.getAllAsync<{ product_id: number; quantity: number }>(
      `SELECT product_id, quantity FROM cart`
    );

    for (const item of cartItems) {
      await db.runAsync(
        `UPDATE products SET stock = stock - ? WHERE id = ?`,
        [item.quantity, item.product_id]
      );
    }
    await db.runAsync("DELETE FROM cart");
    Alert.alert("Thanh toán thành công", "Đã trừ tồn kho và xoá giỏ hàng!");
    setTimeout(() => {
      router.push({
        pathname: "/",
        params: { refresh: "true" },
      });
    }, 1000);
  };

  const vat = total * 0.1;
  const grandTotal = total + vat;

  return (
    <View style={styles.container}>
      <Text style={styles.header}> HÓA ĐƠN THANH TOÁN</Text>
      <Text style={styles.date}>Ngày: {new Date().toLocaleString()}</Text>

      {items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Giỏ hàng trống.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/")}
          >
            <Text style={styles.backText}>Quay lại mua hàng</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.detail}>
                    {item.quantity} × {item.price.toLocaleString()} đ
                  </Text>
                </View>
                <Text style={styles.itemTotal}>
                  {(item.price * item.quantity).toLocaleString()} đ
                </Text>
              </View>
            )}
          />

          <View style={styles.summary}>
            <View style={styles.row}>
              <Text style={styles.label}>Tổng cộng</Text>
              <Text style={styles.value}>{total.toLocaleString()} đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>VAT (10%)</Text>
              <Text style={styles.value}>{vat.toLocaleString()} đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Thành tiền</Text>
              <Text style={styles.totalValue}>
                {grandTotal.toLocaleString()} đ
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handleCheckout}>
            <Text style={styles.payText}>Thanh toán & Trừ tồn kho</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: "#999" }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>Quay lại</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 5,
  },
  date: {
    textAlign: "center",
    color: "#777",
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  summary: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#444",
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#28A745",
  },
  payButton: {
    backgroundColor: "#28A745",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  payText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  backText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    marginBottom: 15,
  },
});
