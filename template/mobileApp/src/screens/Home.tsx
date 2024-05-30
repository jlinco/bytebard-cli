import React from 'react';
import MainLayout from '../layouts/MainLayout';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/RootNavTypes';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: HomeProps) {
  return (
    <MainLayout>
      <View style={styles.topView}>
        <View style={styles.iconView} />
        <View style={styles.textView}>
          <Text style={styles.textContent} />
          <Text style={styles.textContent2} />
        </View>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.description}>We can place any content here</Text>
        <Text style={styles.description}>
          The button below takes to another page. This is to demonstrate basic
          navigation with this setup.
        </Text>
        <Text style={styles.description}>
          Feel free to modify this screen as you see fit
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Details')}
          style={styles.navButton}>
          <Text>More Details</Text>
        </Pressable>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  iconView: {
    width: 50,
    height: 50,
    backgroundColor: 'powderblue',
    borderRadius: 5,
    marginRight: 10,
  },
  textView: {
    flex: 3,
  },
  textContent: {
    backgroundColor: '#e2e2e2',
    width: '65%',
    borderRadius: 8,
    padding: 1,
  },
  textContent2: {
    backgroundColor: '#e2e2e2',
    width: 'auto',
    borderRadius: 8,
    padding: 1,
    marginVertical: 4,
  },
  bottomView: {
    flex: 2,
    justifyContent: 'center',
    paddingBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  description: {
    textAlign: 'center',
    lineHeight: 18,
    fontSize: 14,
  },
  navButton: {
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 30, height: 100},
  },
});

export default Home;
