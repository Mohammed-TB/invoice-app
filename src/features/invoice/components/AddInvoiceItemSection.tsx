import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useInvoice } from "../hooks/use-invoice";
import Toast from "react-native-toast-message";

export default function AddInvoiceItemSection() {
  const { addItem } = useInvoice();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAddItem = () => {
    if (!name.trim() || !quantity || !price) {
      Toast.show({
        type: 'error',
        text1: 'تنبيه',
        text2: 'الرجاء تعبئة جميع حقول الصنف الحالي!',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    const qtyNum = Number(quantity);
    const priceNum = Number(price);

    if (isNaN(qtyNum) || qtyNum <= 0 || isNaN(priceNum) || priceNum <= 0) {
      Toast.show({
        type: 'error',
        text1: 'خطأ في البيانات',
        text2: 'يرجى إدخال أرقام صحيحة أكبر من الصفر للكمية والسعر',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    // إضافة المنتج للـ Context المنظم
    addItem({
      item_name: name.trim(),
      quantity: qtyNum,
      price: priceNum,
    });

    // إشعار نجاح الإضافة
    Toast.show({
      type: 'success',
      text1: 'تمت الإضافة ➕',
      text2: `تم إدراج (${name.trim()}) في الفاتورة`,
      position: 'top',
      visibilityTime: 2000,
    });

    // تصفير المدخلات فوراً استعداداً للمنتج التالي
    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <Card>
      <View className="items-center mb-4 border-b border-gray-100 pb-3">
        <Text className="font-bold text-base text-gray-800">تفاصيل الأصناف والكميات</Text>
      </View>
      
      <View className="gap-3">
        {/* حقل اسم الصنف */}
        <View className="gap-1">
          <Text className="font-bold text-gray-700 text-right">البيان / اسم الصنف</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="مثال: جاكيت أسود تركي"
          />
        </View>

        {/* حقل الكمية والسعر */}
        <View className="flex-row gap-3 w-full">
          <View className="flex-1 gap-1">
            <Text className="font-bold text-gray-700 text-right">سعر الوحدة</Text>
            <Input
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="0.00"
            />
          </View>
          
          <View className="flex-1 gap-1">
            <Text className="font-bold text-gray-700 text-right">العدد / Qty</Text>
            <Input
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>
        </View>

        {/* زر الإضافة السريع للجدول */}
        <View className="mt-2">
          <Button title="إدراج في الفاتورة" onPress={handleAddItem} />
        </View>
      </View>
    </Card>
  );
}