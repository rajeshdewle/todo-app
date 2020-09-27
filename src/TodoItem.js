import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export const TodoItem = ({item, updateStatus, deleteTodo}) => (
  <View
    style={{
      borderBottomWidth: 1,
      borderColor: '#cccccc',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    }}>
    <Pressable
      onPress={() => updateStatus(!item.completed, item.id)}
      style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
        }}>
        <CheckBox
          disabled={false}
          value={item.completed}
          style={styles.checkbox}
          lineWidth={2}
          boxType="square"
          animationDuration={0.1}
        />
        <Text
          style={{
            fontSize: 18,
            color: '#333333',
            letterSpacing: 1,
            textDecorationLine: item.completed ? 'line-through' : 'none',
          }}>
          {item.title}
        </Text>
      </View>
    </Pressable>
    <Button onPress={() => deleteTodo(item.id)} title="delete" />
  </View>
);

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    marginLeft: 1,
    marginRight: 8,
  },
});
