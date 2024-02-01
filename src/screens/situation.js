import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import MapWithMarkers from '../components/screens/situation/map-with-markers/MapWithMarkers';
import Menu from '../components/common/menu/menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function Situation() {
  const [farmData, setFarmData] = useState([]);
  const [repellingData, setRepellingData] = useState([]);

  useEffect(() => {
    const axiosInstance = axios.create({
      withCredentials: true, // withCredentials 설정
    });

    const fetchFarmList = async () => {
      console.log(await AsyncStorage.getItem('accessToken'));

      const accessToken = await AsyncStorage.getItem('accessToken');

      try {
        const response = await axiosInstance.get(
          'http://222.116.135.206:8080/api/v1/farm/list',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log(response.data);
        console.log(
          '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
          response.data[0].repellentDevice,
        );
        setFarmData(response.data);
      } catch (error) {
        console.error(error.response);
      }
    };

   const fetchRepellingList = async () => {
      const accessToken2 = await AsyncStorage.getItem('accessToken');
      console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', accessToken2);

      try {
        const response2 = await axiosInstance.get(
          'http://222.116.135.206:8080/api/v1/repellent-data/main?farmId=1',
          {
            headers: {
              Authorization: `Bearer ${accessToken2}`,
            },
          },
        );
        console.log(
          '*!@(#)*!@)#*!@#&(*!@#&!(@#&!*@(#&(!@&#(*!@&',
          response2.data,
        );
        console.log(response2.data.dayByDetectionList);
        setRepellingData(response2.data.dayByDetectionList);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchRepellingList();
    fetchFarmList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapWithMarkers farmData={farmData} repellingData={repellingData} />
      <Menu />
    </SafeAreaView>
  );
}

// export default function Situation() {
//   const [repellingData, setRepellingData] = useState([]);

//   useEffect(() => {
//     // 기존의 fetchRepellingList 로직을 farmData를 사용하는 로직으로 변경
//     const fetchRepellingList = async () => {
//       console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', farmData);
//       setRepellingData(farmData);
//     };

//     fetchRepellingList();
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <MapWithMarkers farmData={farmData} repellingData={repellingData} />
//       <Menu />
//     </SafeAreaView>
//   );
// }

