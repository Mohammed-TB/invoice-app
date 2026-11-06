import { View, Text, Pressable } from "react-native";
import {ArrowLeft, Settings} from 'lucide-react-native'
import { router } from "expo-router";
import React from "react";

type Props = {
  title: string;
  showBack?: boolean;
  showSettingsIcon?:boolean
};

export default function AppHeader({
  title,
  showBack = true,
  showSettingsIcon = false,
}: Props) {
  return (
    <View className="h-16 flex-row items-center justify-between border-b border-gray-200 px-5 bg-white">


      <Text className="text-xl font-bold ">
        {title}
      </Text>
      <View className="flex-row gap-10  ">
              {showSettingsIcon && (
        <Settings onPress={()=> router.push('settings/')}/>

      )}
         
      
      {showBack ? (
        <Pressable onPress={() => router.back()}>
          <Text className="text-base"><ArrowLeft size={20}/></Text>
        </Pressable>
      ) : (
        <View className="w-6 items-start" />
      )}

   

      </View>



    </View>
  );
}