import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

interface Props {
  stationName: any;
  stationNum: any;
  navigation: any;
}

const Search: React.FC<Props> = ({ stationName, stationNum, navigation }) => {
  return (
    <SearchContainer>
      <SearchBox>
        <SearchInput placeholder={`'${stationName}, ${stationNum}' 검색하기`} />
        <TouchableOpacity 
            // onPress={() =>
            //   navigation.navigate('Main', {
            //     lat: lat,
            //     lon: lon,
            //     stationName: stationName,
            //     stationNum: stationNum,
            //   })
        // }
        >
            <Image
              source={require('../assets/icons/Search.png')}
              resizeMode="contain"
            /></TouchableOpacity>
      </SearchBox>
    </SearchContainer>
  );
};
const SearchContainer = styled.View`
  width: 100%;
  padding: 25px;
  height: 11%;
`;
const SearchBox = styled.View`
  width: 100%;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
`;
const SearchInput = styled.TextInput`
  width: 80%;
  padding: 0;
`;
export default Search;
