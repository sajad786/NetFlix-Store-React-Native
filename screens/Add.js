import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView,} from 'react-native';
import {
  NativeBaseProvider,
  Input,
  Box,
  Button,
  Heading,
  Stack,
  FormControl,
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation, route}) => {
  const [name, setName] = useState('')
   const [totalNoSeasons, setTotalNoSeasons] = useState('');
   
   const addToList = async () => {
     try {
       if (!name || !totalNoSeasons){
         return alert ('please add both fields')
       }

       const seasonsToAdd = {
         id : shortid.generate(),
         name:name,
         totalNoSeasons:totalNoSeasons,
         isWatched: false,
       };

       const storedValue = await AsyncStorage.getItem('@season_list');
       console.log(storedValue,"value added")
       const prevList = await JSON.parse(storedValue)
       console.log(prevList,"previous list")

       if (!prevList){
         const newList = [seasonsToAdd]
         await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
       } else {
         prevList.push(seasonsToAdd)
         await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
       }

       navigation.navigate('Home')

     } catch (error) {
      console.log(error)       
     }
   }


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
                keyboardType='number-pad'
                 variant="rounded"
                 p={2}
                 placeholder="Total No of seasons"
                 style={styles.inputStyle}
                 value={totalNoSeasons}
                 onChangeText={text => setTotalNoSeasons(text)}
               />
             </Stack>
             <Button variant="solid" style={styles.btn} onPress={addToList}>
               <Text style={{backgroundColor: '#00b7c2', color: '#eee'}}>
                 Add
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

export default Add;
