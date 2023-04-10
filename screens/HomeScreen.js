import { View, Text, ImageBackground } from "react-native";
import React, { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { girl, pudurangala } from "../assets";
import { TouchableOpacity } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-[#fff] flex-1 relative">
      <ImageBackground
        source={pudurangala}
        className="w-full h-full object-contain relative"
      >
        <View className="flex-row px-6 mt-8 items-center space-x-4">
          <View className="w-16 h-16 bg-black rounded-full items-center justify-center ">
            <Text className="text-white text-3xl font-semibold">Go</Text>
          </View>
          <View>
            <Text className="text-black text-[25px] italic font-bold">SomeWhere 🚵🏻</Text>
          </View>
        </View>
        <View className="px-6 mt-4 ">
          <Text className="text-[#0bb505] text-[42px] font-semibold -mt-1 drop-shadow-xl">
            Enjoy the trip with
          </Text>
          <Text className="text-[#b57d05] text-[30px] font-bold">
            Awesome Moments 🤪
          </Text>
          <Text className="text-[#706c53] italic text-[15px] font-bold">
            "The world is a book and those who do not travel read only one page"
            <Text className="text-[13px]"> - Saint Augustine</Text>{" "}
          </Text>
        </View>

        <View className="flex-1 relative items-center justify-center">
          <Animatable.Image
            animation="fadeIn"
            easing="ease-in-out"
            source={girl}
            className="w-full h-full"
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("Discover")}
            className="absolute bottom-8 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#3bc714] rounded-full items-center justify-center"
          >
            <Animatable.View
              animation={"pulse"}
              easing={"ease-in-out"}
              iterationCount={"infinite"}
              className="w-20 h-20 items-center justify-center bg-[#3bc714] rounded-full"
            >
              <Text className="text-[#f4f7e9] text-[30px] font-semibold">
                Go
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
