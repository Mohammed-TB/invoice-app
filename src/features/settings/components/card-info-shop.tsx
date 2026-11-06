import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { getShopSettings, updateShopSettingsDB, initShopTable } from "../../../database/shop-db";

export default function CardInfoShop() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [amqiAccount, setAmqiAccount] = useState("");
  const [busairiAccount, setBusairiAccount] = useState("");

  // جلب البيانات عند فتح الشاشة
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      await initShopTable();
      const settings = await getShopSettings();
      if (settings) {
        setName(settings.name || "");
        setPhone(settings.phone || "");
        setAddress(settings.address || "");
        setAmqiAccount(settings.amqiAccount || "");
        setBusairiAccount(settings.busairiAccount || "");
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      Toast.show({
        type: 'error',
        text1: 'خطأ',
        text2: 'فشل في تحميل بيانات المحل',
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // 1. التحقق من الحقول الأساسية
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'تنبيه',
        text2: 'يرجى إدخال اسم المحل',
        position: 'top',
      });
      return;
    }

    if (!phone.trim()) {
      Toast.show({
        type: 'error',
        text1: 'تنبيه',
        text2: 'يرجى إدخال رقم الهاتف',
        position: 'top',
      });
      return;
    }

    if (!address.trim()) {
      Toast.show({
        type: 'error',
        text1: 'تنبيه',
        text2: 'يرجى إدخال عنوان المحل',
        position: 'top',
      });
      return;
    }

    // 2. التحقق من صحة رقم الهاتف وحسابات البنوك
    const phoneRegex = /^[0-9+\s-]{6,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      Toast.show({
        type: 'error',
        text1: 'خطأ في البيانات',
        text2: 'يرجى إدخال رقم هاتف صحيح',
        position: 'top',
      });
      return;
    }

    try {
      setSaving(true);
      await updateShopSettingsDB({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        amqiAccount: amqiAccount.trim(),
        busairiAccount: busairiAccount.trim(),
      });

      Toast.show({
        type: 'success',
        text1: 'تم بنجاح 👏',
        text2: 'تم حفظ بيانات المحل والحسابات بنجاح',
        position: 'top',
        visibilityTime: 2500,
      });
    } catch (error) {
      console.error("Save settings error:", error);
      Toast.show({
        type: 'error',
        text1: 'خطأ',
        text2: 'تعذر حفظ البيانات في قاعدة البيانات',
        position: 'top',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <ActivityIndicator size="large" color="#1e3a8a" />
      </Card>
    );
  }

  return (
    <Card>
      <View className="gap-3 mb-4">
        <Text className="font-bold text-gray-800 text-right text-base mb-1">
          بيانات المحل الأساسية
        </Text>

        <View className="gap-1">
          <Text className="text-xs font-semibold text-gray-600 text-right">اسم المحل</Text>
          <Input value={name} onChangeText={setName} placeholder="أدخل اسم المحل" />
        </View>

        <View className="gap-1">
          <Text className="text-xs font-semibold text-gray-600 text-right">الهاتف</Text>
          <Input value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="أدخل رقم الهاتف" />
        </View>

        <View className="gap-1">
          <Text className="text-xs font-semibold text-gray-600 text-right">العنوان</Text>
          <Input value={address} onChangeText={setAddress} placeholder="أدخل العنوان التفصيلي" />
        </View>

        <View className="border-t border-gray-200 my-2 pt-3">
          <Text className="font-bold text-gray-800 text-right text-base mb-2">
            الحسابات المصرفية للتحويل
          </Text>

          <View className="gap-1 mb-2">
            <Text className="text-xs font-semibold text-gray-600 text-right">حساب العمقي</Text>
            <Input value={amqiAccount} onChangeText={setAmqiAccount} keyboardType="numeric" placeholder="رقم حساب العمقي" />
          </View>

          <View className="gap-1">
            <Text className="text-xs font-semibold text-gray-600 text-right">حساب البسيري</Text>
            <Input value={busairiAccount} onChangeText={setBusairiAccount} keyboardType="numeric" placeholder="رقم حساب البسيري" />
          </View>
        </View>
      </View>

      <Button title={saving ? "جاري الحفظ..." : "حفظ التغييرات"} onPress={handleSave} disabled={saving} />
    </Card>
  );
}