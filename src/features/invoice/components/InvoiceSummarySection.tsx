import Card from "@/components/ui/card";
import React from "react";
import { View, Text } from "react-native";
import InvoiceSummaryCard from "./invoice-summary-card";
import { useInvoice } from "../hooks/use-invoice";

export default function InvoiceSummarySection(){
    const { currentInvoice } = useInvoice();

    const currencyText = currentInvoice.currency === "YER" ? "ريال يمني" : "ريال سعودي";

    return (
        <Card>
            <View className="items-center mb-5 border-b border-gray-100 pb-3">
                <Text className="font-bold text-lg text-gray-800">الأصناف المضافة</Text>
            </View>
            
            {currentInvoice.items.length === 0 ? (
                <Text className="text-center text-gray-400 py-5">لم يتم إضافة أي أصناف بعد.</Text>
            ) : (
                <View>
                    <View className="flex-row justify-between border-b border-gray-100 pb-3 items-center w-full">
                        <Text className="flex-1 text-center font-bold text-gray-600">اسم الصنف</Text>
                        <Text className="flex-1 text-center font-bold text-gray-600">الكمية</Text>
                        <Text className="flex-1 text-center font-bold text-gray-600">السعر</Text>
                    </View>
                    
                    <View className="gap-1">
                        {currentInvoice.items.map((item)=>(
                            <InvoiceSummaryCard
                                key={item.id}
                                item_name={item.item_name}
                                quantity={item.quantity}
                                price={item.price}
                            />
                        ))}
                    </View>
                    
                    <View className="flex-row justify-between mt-5 pt-3 border-t border-dashed border-gray-200 items-center w-full">
                        <Text className="text-gray-700 font-bold text-base">الإجمالي:</Text>
                        <Text className="text-center font-extrabold text-blue-600 text-lg">
                            {currentInvoice.total} {currencyText}
                        </Text>
                    </View>
                </View>
            )}
        </Card>
    );
}