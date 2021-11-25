import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Linking} from 'react-native';
import {
 
  Box,
  Icon,
  Fab,
  NativeBaseProvider,
  Center,
  Button,
  List,
  Checkbox,
  Heading,
  ListItem,
  Left,
  Container,
  HStack,
  Text,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {alignItems, left, style} from 'styled-system';
import { alignSelf } from 'styled-system';
import {useIsFocused} from '@react-navigation/native';




const Home = ({navigation, route}) => {

  const isFocused = useIsFocused()
  
  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [loading, setLoading] = useState(false)
  
  const getList = async () => {
    setLoading(true)

    const storedValue = await AsyncStorage.getItem('@season_list');
    if (!storedValue) {
      setListOfSeasons([])
    }

    const list = JSON.parse(storedValue)
    setListOfSeasons(list)
    setLoading(false);
  };

  const deleteSeason = async (id) =>{
    const newList = await listOfSeasons.filter((list)=>list.id !== id);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
    setListOfSeasons(newList);
  };

  const markComplete = async (id) => {
      const newArr = listOfSeasons.map((list)=> {
        if (list.id == id) {
          list.isWatched = !list.isWatched;
        }
        return list
      })

      await AsyncStorage.setItem('@season_list', JSON.stringify(newArr))
      setListOfSeasons(newArr);
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  if (loading) {
    return (
      <NativeBaseProvider>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner size="lg" color="#00b7c2" />
        </View>
      </NativeBaseProvider>
    );
  }
  
  return (
    <NativeBaseProvider >
      <View Style={style.container}>
        {listOfSeasons.length == 0 ? (
          <View>
            <Heading style={styles.heading}>
              watch List is empty. Please add a season
            </Heading>
          </View>
        ) : (
          <View>
            <Box>
              <ScrollView
                contentContainerStyle={{backgroundColor: '#1b262c', }}>
                <View>
                  <Heading style={styles.heading}>Next Series To watch</Heading>
                </View>
                {listOfSeasons.map(season => (
                  <List key={season.id} spacing={2} my={2}>
                    <HStack style={styles.listItem}>
                      <View
                        style={{
                          justifyContent: 'space-around',
                          flexDirection: 'row',
                        }}>
                        <Button
                          style={styles.actionButton}
                          onPress={() => deleteSeason(season.id)}>
                          <Icon
                            color="white"
                            as={<AntDesign name="delete" />}
                            size="sm"
                          />
                        </Button>
                        <Button
                          style={styles.actionButton}
                          onPress={() => {
                            navigation.navigate('Edit', {season});
                          }}>
                          <Icon
                            color="white"
                            as={<AntDesign name="edit" />}
                            size="sm"
                          />
                        </Button>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          paddingLeft: 10,
                        }}>
                        <Text style={styles.seasonName}>{season.name}</Text>
                        <Text color="amber.400">
                          {season.totalNoSeasons} seasons To watch
                        </Text>
                      </View>
                      <View style={styles.Checkbox}>
                        <Checkbox
                          checked={season.isWatched}
                          onPress={() => markComplete(season.id)}
                          value="test"
                          accessibilityLabel="This is a dummy checkbox"
                        />
                      </View>
                    </HStack>
                  </List>
                ))}
              </ScrollView>
            </Box>
          </View>
        )}

        <Center Center flex={1} px="3">
          <Box position="relative" h={100} w="100%">
            <Fab
              position="absolute"
              size="sm"
              onPress={() => navigation.navigate('Add')}
              icon={
                <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
              }
            />
          </Box>
        </Center>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
    fontSize:18,
    fontWeight:'600'
  },
  listItem: {
    marginLeft: 0,
    // marginBottom: 20,
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems: 'flex-end',
    // // paddingHorizontal:2

  },
  Checkbox:{
    justifyContent:'center',
     alignItems:'center', 
     alignSelf: "center", 
     padding:10
  }
});

export default Home;
