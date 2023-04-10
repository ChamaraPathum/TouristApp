import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";

const MenuContaionr = ({ title, imageSrc, type, setType }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
  };

  return (
    <TouchableOpacity
      className="items-center justify-center space-y-2"
      onPress={handlePress}
    >
      <View
        className={`w-20 h-20 p-2 shadow-sm rounded-full items-center justify-center ${
          type === title.toLowerCase() ? "bg-[#a487ab]" : ""
        }`}
      >
        <Image source={imageSrc} className="w-full h-full object-contain" />
      </View>
      <Text className="text-[#527283] text-xl font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuContaionr;
