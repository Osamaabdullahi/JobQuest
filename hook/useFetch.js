import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = RAPID_API_KEY;

const usefetch = ({ endpoint, query }) => {
  const [Data, setData] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  const [Error, setError] = useState(null);

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",

    headers: {
      "X-RapidAPI-Key": "6fa3fbdd43msh8da23a91950b67fp1e3bcajsnf317e36f7026",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    // params: { ...query },
    params: {
      query: "Python developer in Texas, USA",
      page: "1",
      num_pages: "1",
    },
  };

  const fetchData = async () => {
    setIsloading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsloading(false);
    } catch (error) {
      setError(error);
      console.log("$$$$$$$", error);

      alert("there is an error");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => {
    Isloading(true);
    fetchData();
  };

  return { Data, Isloading, Error, refresh };
};

export default usefetch;
