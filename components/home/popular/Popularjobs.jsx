import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../../components/common/cards/popular/PopularJobCard";
import usefetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { Data, Isloading, Error, refresh } = usefetch("search", {
    query: "Python developer in Texas, USA",
    page: "1",
    num_pages: "1",
  });

  const [selectedJob, setselectedJob] = useState("");

  const handleCardPress = () => {
    router.push(`/job-details/${item.job_id}`);
    setselectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popularjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {Isloading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : Error ? (
          <Text>something is wrong</Text>
        ) : (
          <FlatList
            data={Data}
            renderItem={(item) => {
              console.log(item);
              return (
                <PopularJobCard
                  item={item.item}
                  handleCardPress={handleCardPress}
                />
              );
            }}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
