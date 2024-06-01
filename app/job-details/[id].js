import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import usefetch from "../../hook/useFetch";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = ["About", "Qualifications", "Responsibilities"];

const jobDetails = () => {
  const [refreshing, setrefreshing] = useState(false);
  const [activeTab, setactiveTab] = useState(tabs[0]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { Data, Isloading, Error, refresh } = usefetch("search", {
    job_id: params.id,
  });
  const onRefresh = () =>
    useCallback(() => {
      setrefreshing(true);
      refresh();
      setrefreshing(false);
    });

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={Data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout info={Data[0].job_description ?? "no data availble"} />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={Data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              dimension="60%"
              handlePress={() => router.back()}
              iconUrl={icons.left}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn dimension="60%" iconUrl={icons.share} />
          ),
          headerTitleAlign: "center",
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {Isloading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : Error ? (
            <Text>something went wrong</Text>
          ) : Data.length === 0 ? (
            <Text>no data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={Data[0].employer_logo}
                jobTitle={Data[0].job_title}
                companyName={Data[0].employer_name}
                location={Data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setactiveTab={setactiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            Data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default jobDetails;
