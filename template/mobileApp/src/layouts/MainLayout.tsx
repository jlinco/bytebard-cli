import React from 'react';
import {StatusBar, StyleSheet, View, useColorScheme} from 'react-native';
import type {PropsWithChildren} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type LayoutProps = PropsWithChildren;
function MainLayout({children}: LayoutProps) {
  const insets = useSafeAreaInsets();
  // Extract this to a theme provider
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.mainContainer,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
});

export default MainLayout;
