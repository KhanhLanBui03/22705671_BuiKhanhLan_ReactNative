import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const router = useRouter();

    const loadCart = async () => {
        const db = await SQLite.openDatabaseAsync("shop.db");
        const rows = await db.getAllAsync<CartItem>(`
      SELECT c.id, p.name, p.price, c.quantity
      FROM cart c JOIN products p ON c.product_id = p.id
    `);
        setCart(rows);
    };

    useEffect(() => {
        loadCart();
    }, []);

    const updateQuantity = async (id: number, delta: number) => {
        const db = await SQLite.openDatabaseAsync("shop.db");
        await db.runAsync(
            "UPDATE cart SET quantity = quantity + ? WHERE id = ? AND quantity + ? > 0",
            [delta, id, delta]
        );
        loadCart();
    };

    const removeItem = async (id: number) => {
        const db = await SQLite.openDatabaseAsync("shop.db");
        await db.runAsync("DELETE FROM cart WHERE id = ?", [id]);
        loadCart();
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng của bạn</Text>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.text}>
                            {item.price.toLocaleString()} đ × {item.quantity}
                        </Text>

                        <View style={styles.row}>
                            <Pressable
                                style={[styles.smallBtn, { backgroundColor: "#2196F3" }]}
                                onPress={() => updateQuantity(item.id, 1)}
                            >
                                <Text style={styles.smallText}>+</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.smallBtn, { backgroundColor: "#FF9800" }]}
                                onPress={() => updateQuantity(item.id, -1)}
                            >
                                <Text style={styles.smallText}>-</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.smallBtn, { backgroundColor: "#f44336" }]}
                                onPress={() => removeItem(item.id)}
                            >
                                <Text style={styles.smallText}>X</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />

            <View style={styles.summary}>
                <Text style={styles.total}>Tổng tiền: {total.toLocaleString()} đ</Text>

                <Pressable
                    style={[styles.primaryButton, { backgroundColor: "#4CAF50" }]}
                    onPress={() => router.push("/invoice")}
                >
                    <Text style={styles.buttonText}>🧾 Xem hoá đơn</Text>
                </Pressable>

                <Pressable
                    style={[styles.primaryButton, { backgroundColor: "gray" }]}
                    onPress={() => router.back()}
                >
                    <Text style={styles.buttonText}>⬅ Quay lại</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FAFAFA", padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    card: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    name: { fontSize: 18, fontWeight: "bold" },
    text: { color: "#555" },
    row: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
    smallBtn: { padding: 8, borderRadius: 6, flex: 1, marginHorizontal: 4 },
    smallText: { color: "white", textAlign: "center", fontWeight: "bold" },
    summary: { marginTop: 20 },
    total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    primaryButton: {
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: { color: "white", fontWeight: "bold" },
});
