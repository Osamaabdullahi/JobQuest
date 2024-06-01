import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setsearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setactiveJobType] = useState("Full-time");
  console.log("$$$$$", searchTerm);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>hello adrian</Text>
        <Text style={styles.welcomeMessage}>find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setsearchTerm(text)}
            placeholder="what are you looking for"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setactiveJobType(item);
                  router.push(`/search/${item}`);
                }}
                style={styles.tab(activeJobType, item)}
              >
                <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
