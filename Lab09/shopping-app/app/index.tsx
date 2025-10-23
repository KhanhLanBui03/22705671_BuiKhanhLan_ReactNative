import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import initDB from "../database/db";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();

  const loadProducts = async () => {
    try {
      const db = await initDB();
      const res = await db.getAllAsync<Product>("SELECT * FROM products");
      setProducts(res);
      setFilteredProducts(res);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };
  useEffect(() => {
    loadProducts();
  }, [params.refresh]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const addToCart = async (id: number) => {
    const db = await initDB();
    const existing = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM cart WHERE product_id = ?",
      [id]
    );

    if (existing && existing.count > 0) {
      await db.runAsync(
        "UPDATE cart SET quantity = quantity + 1 WHERE product_id = ?",
        [id]
      );
    } else {
      await db.runAsync(
        "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
        [id, 1]
      );
    }

    Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
  };

  const deleteProduct = async (id: number) => {
    const db = await initDB();
    await db.runAsync("DELETE FROM products WHERE id = ?", [id]);
    await loadProducts();
    Alert.alert("Đã xóa", "Sản phẩm đã được xóa!");
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setNewName(product.name);
    setNewPrice(product.price.toString());
    setNewStock(product.stock.toString());
    setModalVisible(true);
  };

  const openAddModal = () => {
    setSelectedProduct(null);
    setNewName("");
    setNewPrice("");
    setNewStock("");
    setModalVisible(true);
  };

  const saveProduct = async () => {
    const db = await initDB();

    if (selectedProduct) {
      await db.runAsync(
        "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
        [newName, parseFloat(newPrice), parseInt(newStock), selectedProduct.id]
      );
      Alert.alert("Cập nhật thành công!");
    } else {
      await db.runAsync(
        "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
        [newName, parseFloat(newPrice), parseInt(newStock) || 0]
      );
      Alert.alert("Đã thêm sản phẩm mới!");
    }

    setModalVisible(false);
    await loadProducts();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quản lý sản phẩm</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm sản phẩm theo tên..."
        value={search}
        onChangeText={handleSearch}
      />

      <View style={styles.actionBar}>
        <Pressable style={styles.primaryButton} onPress={openAddModal}>
          <Text style={styles.buttonText}>+ Thêm sản phẩm</Text>
        </Pressable>
        <Pressable
          style={[styles.primaryButton, { backgroundColor: "#4CAF50" }]}
          onPress={() => router.push("/cart")}
        >
          <Text style={styles.buttonText}>Giỏ hàng</Text>
        </Pressable>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>{item.price.toLocaleString()} đ</Text>
            <Text style={styles.text}>Tồn: {item.stock}</Text>

            <View style={styles.row}>
              <Pressable
                style={[styles.smallBtn, { backgroundColor: "#f44336" }]}
                onPress={() =>
                  Alert.alert("Xác nhận", `Xóa "${item.name}"?`, [
                    { text: "Hủy", style: "cancel" },
                    { text: "Xóa", onPress: () => deleteProduct(item.id) },
                  ])
                }
              >
                <Text style={styles.smallText}>Xóa</Text>
              </Pressable>

              <Pressable
                style={[styles.smallBtn, { backgroundColor: "#FF9800" }]}
                onPress={() => openEditModal(item)}
              >
                <Text style={styles.smallText}>Sửa</Text>
              </Pressable>

              <Pressable
                style={[styles.smallBtn, { backgroundColor: "#4CAF50" }]}
                onPress={() => addToCart(item.id)}
              >
                <Text style={styles.smallText}>+ Giỏ</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {selectedProduct ? "✏ Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Tên sản phẩm"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá sản phẩm"
              value={newPrice}
              onChangeText={setNewPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Số lượng tồn kho"
              value={newStock}
              onChangeText={setNewStock}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: "gray" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalText}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: "#4CAF50" }]}
                onPress={saveProduct}
              >
                <Text style={styles.modalText}>Lưu</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  text: { color: "#555" },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  smallBtn: { padding: 8, borderRadius: 5, flex: 1, marginHorizontal: 4 },
  smallText: { color: "white", textAlign: "center", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: { width: "85%", backgroundColor: "white", borderRadius: 10, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  modalText: { color: "white", fontWeight: "bold" },
});
