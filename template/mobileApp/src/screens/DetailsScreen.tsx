import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootNavTypes';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({navigation}: DetailsProps) {
  return (
    <MainLayout>
      <View style={styles.detailsContainer}>
        <Text>Our Details Screen</Text>
        <Text>Style and change as you see fit</Text>
        <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default DetailsScreen;
