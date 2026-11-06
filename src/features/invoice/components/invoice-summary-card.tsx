import React from "react";
import { Text, View } from "react-native";
type Props = {
item_name:string,
quantity:number,
price:number
}

export default function InvoiceSummaryCard({item_name,quantity,price}:Props){
    return (
        <View className="flex-row justify-between items-center w-full border-gray-200 border-b pb-3">
            <Text className="flex-1 text-center">{item_name}</Text>
            <Text className="flex-1 text-center">{quantity}</Text>
            <Text className="flex-1 text-center">{price}</Text>
        </View>
    )
}