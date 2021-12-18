import React from "react";
import { Text, TouchableHighlight, StyleSheet, View, TouchableOpacity, GestureResponderEvent } from 'react-native';

export type Props = {
  dayName: string;
  dayId: number;
  active?: boolean;
  current?: boolean;
  holyday?: boolean;
  onPress?: (dayId: number) => void;
}

const WeekButton: React.FC<Props> = ({
  dayName,
  dayId,
  active = false,
  current = false,
  holyday = false,
  onPress = undefined
}) => {
  const onPressHandler = () => {
    if (onPress !== undefined) {
      onPress(dayId);
    }
  }

  return (
    <TouchableOpacity onPress={onPressHandler}
      style={styles.weekButtonContainer}>
      <View style={active ? styles.weekButtonActive :
        current ? styles.weekButtonCurrent : styles.weekButton}>
        <Text
          style={active ? styles.weekButtonActiveText :
            holyday ? styles.weekButtonHolydayText : styles.weekButtonText}
        >
          {dayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  weekButtonContainer: {
    flex: 1
  },
  weekButton: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  weekButtonCurrent: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#99B9F5',
    borderTopWidth: 5,
    borderTopColor: 'white'
  },
  weekButtonText: {
    color: '#99B9F5',
    letterSpacing: 1,
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 14
  },
  weekButtonHolydayText: {
    color: '#C0C3CF',
    letterSpacing: 1,
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 14
  },
  weekButtonActive: {
    backgroundColor: '#99B9F5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  weekButtonActiveText: {
    color: '#fff',
    letterSpacing: 1,
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 14
  }
});

export default WeekButton;
