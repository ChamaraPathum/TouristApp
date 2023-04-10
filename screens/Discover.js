import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
import { My, NotFound, attraction, avatar, hotel, my, restaurants } from "../assets";
import { ScrollView } from "react-native";
import MenuContaionr from "../components/MenuContaionr";
import { FontAwesome } from "@expo/vector-icons";
import ItemCardContainor from "../components/ItemCardContainor";
import { ActivityIndicator } from "react-native";
import { getPlaceData } from "../api";

const Discover = () => {
  const navigation = useNavigation();

  const [type, setType] = useState("restaurants");
  const [isloading, setIsloading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsloading(true);
    getPlaceData(bl_lat,bl_lng,tr_lat,tr_lng,type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsloading(false);
      }, 2000);
    });
  }, [bl_lat,bl_lng,tr_lat,tr_lng,type]);

  return (
    <SafeAreaView className="flex-1 bg-[#edd7fc]">
      <View className="flex-row items-center justify-between px-8 mt-5">
        <View>
          <Text className="text-[40px] text-[#77a1b5] font-semibold">
            Discover
          </Text>
          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>
        <View className="w-14 h-14 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={my}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center mx-4 rounded-xl py-1 px-4 drop-shadow-2xl mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat)
            setBl_lng(details?.geometry?.viewport?.southwest?.lng)
            setTr_lat(details?.geometry?.viewport?.northeast?.lat)
            setTr_lng(details?.geometry?.viewport?.northeast?.lng)
          }}
          query={{
            key: "AIzaSyAbvdtYWLHIOYKhyu7rUaIi5rJBCtrIWyI",
            language: "en",
          }}
        />
      </View>

      {isloading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#77a1b5" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-center justify-between px-8 mt-4">
            <MenuContaionr
              key={"hotels"}
              title="Hotels"
              imageSrc={hotel}
              type={type}
              setType={setType}
            />

            <MenuContaionr
              key={"attractions"}
              title="Attractions"
              imageSrc={attraction}
              type={type}
              setType={setType}
            />

            <MenuContaionr
              key={"restaurants"}
              title="Restaurants"
              imageSrc={restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row  items-center justify-between px-4 mt-4">
              <Text className="text-[#77a1b5] text-[28px] font-bold ">
                Top Tips
              </Text>
              <TouchableOpacity
                cla
                ssName="flex-row items-center justify-center space-x-2"
              >
                <Text className="text-[#adc1c9] text-[20px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#b5bab6"
                />
              </TouchableOpacity>
            </View>

            <View className="px-4 mt-8 flex-row  items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCardContainor
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w=full h-[300px] flex-1  items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className="w-32 h-32 object-cover "
                    />
                    <Text className="text-2xl text-[#77a1b5] font-semibold">
                      No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
