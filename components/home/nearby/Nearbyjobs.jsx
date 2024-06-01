import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import usefetch from "../../../hook/useFetch";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
  const router = useRouter();
  const { Data, Isloading, Error, refresh } = usefetch("search", {
    query: "Python developer in Texas, USA",
    page: "1",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>near jobs</Text>
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
          Data?.map((job, index) => {
            return (
              <NearbyJobCard
                handleNavigate={() => {
                  return router.push(`/job-details/${job.job_id}`);
                }}
                job={job}
                key={`nearby-job${job?.job_id}`}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
