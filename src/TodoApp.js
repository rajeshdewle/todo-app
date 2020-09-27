import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {TodoItem} from './TodoItem';

export default TodoApp = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    AsyncStorage.getItem('todos')
      .then((res) => {
        let list = JSON.parse(res);
        if (list.length) {
          setTodos(list);
        } else {
          setTodos([]);
        }
      })
      .catch((error) => console.log(error));
  };

  const addTodo = () => {
    if (text) {
      AsyncStorage.setItem(
        'todos',
        JSON.stringify([
          ...todos,
          {
            id: todos.length + 1,
            title: text,
            completed: false,
          },
        ]),
      )
        .then(() => {
          getData();
          setText();
          setError();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError('Field is required.');
    }
  };

  const updateStatus = (completed, id) => {
    let todoIndex = todos.findIndex((todo) => todo.id == id);
    let newTodos = [...todos]; // make a separate copy of the array

    newTodos[todoIndex] = {
      ...newTodos[todoIndex],
      completed: completed,
    };

    AsyncStorage.setItem('todos', JSON.stringify(newTodos)).then(() => {
      getData();
    });
  };

  const deleteTodo = (id) => {
    let todoIndex = todos.findIndex((todo) => todo.id == id);
    let newTodos = [...todos];
    newTodos.splice(todoIndex, 1);

    AsyncStorage.setItem('todos', JSON.stringify(newTodos)).then(() => {
      getData();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View>
        <View style={{flexDirection: 'row', marginBottom: 40}}>
          <TextInput
            placeholder="What do you want to do?"
            style={styles.input}
            onChangeText={(text) => setText(text)}
            defaultValue={text}
          />
          <TouchableOpacity style={styles.button} onPress={addTodo}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'red',
            marginBottom: 20,
            position: 'absolute',
            bottom: 0,
          }}>
          {error}
        </Text>
      </View>

      <View>
        <Text style={{letterSpacing: 1, color: '#333333'}}>
          Todo list items ({todos.length})
        </Text>
        <FlatList
          style={{marginBottom: 300}}
          data={todos}
          renderItem={({item}) => (
            <TodoItem
              item={item}
              updateStatus={updateStatus}
              deleteTodo={deleteTodo}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'dodgerblue',
    borderBottomRightRadius: 6,
    borderTopEndRadius: 6,
    backgroundColor: 'dodgerblue',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    flex: 4,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 6,
    borderBottomStartRadius: 6,
  },
});
