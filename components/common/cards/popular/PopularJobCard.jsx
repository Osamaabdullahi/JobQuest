import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ selectedJob, item, handleCardPress }) => {
  console.log(item.employer_logo, item.employer_name, "%%%");
  return (
    <TouchableOpacity
      onPress={() => handleCardPress(item)}
      style={styles.container(selectedJob, item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={{
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.companyName}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.jobName(selectedJob, item)}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
