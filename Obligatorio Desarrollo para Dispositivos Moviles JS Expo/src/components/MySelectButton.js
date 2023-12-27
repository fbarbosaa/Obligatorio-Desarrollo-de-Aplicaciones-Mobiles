import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MySelectButton = ({ title = 'My Button', btnColor = 'red', btnIcon = 'star', options = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.button, { backgroundColor: btnColor }]} onPress={item.onPress}>
        <View style={styles.container}>
          <Icon style={styles.icon} name={item.btnIcon} size={40} color="white" />
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: btnColor }]} onPress={handlePress}>
        <View style={styles.container}>
          <Icon style={styles.icon} name={btnIcon} size={40} color="white" />
          <Text style={styles.text}>{title}</Text>
          <Icon style={styles.icon} name={expanded ? 'angle-up' : 'angle-down'} size={30} color="white" />
        </View>
      </TouchableOpacity>
      {expanded && (
        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    color: 'white',
    padding: 10,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
  icon: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default MySelectButton;
