import React from "react";
import { View ,Text} from "react-native";
import CardInfoShop from "./card-info-shop";
import AppHeader from "@/components/layout/app-header";
import Screen from "@/components/layout/screen";
import Page from "@/components/layout/page-container";

export default function SettingsApp(){
    return (
    <Screen>
      <AppHeader title="الإعدادات" showSettingsIcon={false}/>

      <Page>

        <View>
          <Text className="text-lg font-bold">
            إعدادات التطبيق
          </Text>
        </View>
       
            <CardInfoShop/>
            <View>
                
            <View className="flex-row justify-center gap-2">
                                <Text className="font-bold">
                     تطوير 
                </Text>
                                <Text className="font-bold">
                    م/ محمد بامعيبد
                </Text>


            </View>
            <View className="flex-row justify-center gap-2">
                <Text>
                    إصدار التطبيق
                </Text>
                <Text>v.0.0.1</Text>
            </View>

            </View>


      </Page>
    </Screen>
    )
}