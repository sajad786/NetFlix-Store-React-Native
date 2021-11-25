
import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
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
  Input,
  Box,
  Stack,
  FormControl,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({navigation, route}) => {

  const [name, setName] = useState("");
  const [totalNoSeasons, setTotalNoSeasons] = useState("")
  const [id, setId] = useState(null)

  const update = async () => {
    try {
      if (!name || !totalNoSeasons ) {
        return alert("please provide both fields");
      }

      const seasonToUpdate = {
          id,
          name,
          totalNoSeasons,
          isWatched:false,
      }

      const storedValue = await AsyncStorage.getItem('@season_list');
      const list = await JSON.parse(storedValue)

      list.map((singleSeason) => {
        if(singleSeason.id == id) {
          singleSeason.name = name;
          singleSeason.totalNoSeasons = totalNoSeasons;
        }
        return singleSeason;
      })
      
      await AsyncStorage.setItem('@season_list',JSON.stringify(list));
      
      navigation.navigate('Home');

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const {season} = route.params
    const {id, name, totalNoSeasons} = season

    setId(id)
    setName(name)
    setTotalNoSeasons(totalNoSeasons)
  },[])
     return (
       <NativeBaseProvider>
         <ScrollView contentContainerStyle={styles.container}>
           <Heading style={styles.heading}> Add to Watch </Heading>
           <FormControl>
             <Stack space={5} style={styles.itemContainer}>
               <Stack style={styles.formItem}>
                 {/* <FormControl.Label>Seasons</FormControl.Label> */}
                 <Input
                   variant="rounded"
                   p={2}
                   placeholder="seasons"
                   style={styles.inputStyle}
                   value={name}
                   onChangeText={text => setName(text)}
                 />
               </Stack>
               <Stack style={styles.formItem}>
                 {/* <FormControl.Label>Password</FormControl.Label> */}
                 <Input
                   variant="rounded"
                   p={2}
                   placeholder="Total No of seasons"
                   style={styles.inputStyle}
                   value={totalNoSeasons}
                   onChangeText={text => setTotalNoSeasons(text)}
                 />
               </Stack>
               <Button variant="solid" style={styles.btn} onPress={update}>
                 <Text style={{backgroundColor: '#00b7c2', color: '#eee'}}>
                   update
                 </Text>
               </Button>
             </Stack>
           </FormControl>
         </ScrollView>
       </NativeBaseProvider>
     );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  inputStyle: {
    color: '#eee',
    padding: 5,
  },
  btn: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#00b7c2',
  },
  itemContainer: {
    marginHorizontal: 10,
  },
});
export default Edit;
