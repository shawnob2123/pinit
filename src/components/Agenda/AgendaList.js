import { View, Text, Pressable, Image } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { Agenda } from 'react-native-calendars';
import { styles } from './styles';
import { colors } from '../../theme/theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgendaList = ({navigation}) => {
  const [items, setItems] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnabolics();
  }, []);

  const getAnabolics = async () => {
    try {
      const value = await AsyncStorage.getItem('@anabolic');
      if (value !== null) {
        setItems(JSON.parse(value));
        setLoading(false);
      }
    } catch (e) {
      showMessage({
        message: 'Error',
        description: 'Something went wrong. Your anabolics could not be loaded',
        type: 'danger',
      });
    }
  };

  

  //clear async storage
  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };
  // clearAsyncStorage();

  const renderItem = (item) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('View Cycle', {
          item: item, id: item.id, anabolicUsed: item.anabolicUsed, dosage: item.dosage, notes: item.notes, startDate: item.startDate, endDate: item.endDate, type: item.type, days: item.days, count: item.count,
        })}
        style={styles.item}>
        <View style={styles.itemContent}>
          <View
            style={{ backgroundColor: item.type === 'Oral' ? colors.orange : colors.primary, height: 50, width: 50, borderRadius: 50, padding: 10, justifyContent: 'center',  }}
          >
          <Fontisto
            name={item.type === 'Oral' ? 'pills' : 'injection-syringe'}
            size={24}
            color={colors.white}
            
            />
            </View>
          <View style={styles.itemHeader}>
            <Text style={styles.title}>{item.anabolicUsed}</Text>
            <Text style={styles.text}>{item.dosage} mg <Text style={styles.text}>({item.type})</Text></Text>
          </View>
        </View>
      </Pressable>
    );
  };

  


  return (
    <View>
      <Agenda
        style={styles.calendar}
        theme={{
          backgroundColor: '#1e1e1e',
          calendarBackground: '#1e1e1e',
          agendaKnobColor: colors.primary,
          agendaDayNumColor: colors.black,
          agendaTodayColor: colors.black,
          agendaDayTextColor: colors.black,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.white,
          dayTextColor: colors.white,
          monthTextColor: colors.white,
          todayTextColor: colors.black,
          todayBackgroundColor: colors.primary,
          dotColor: colors.orange,
        }}
        renderItem={renderItem}
        items={items}
        scrollEnabled={true}
        pastScrollRange={50}
        showOnlySelectedDayItems={true}
        showClosingKnob={true}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        selected={new Date()}
        nestedScrollEnabled={true}
        refreshing={loading}
        onRefresh={() => {
          getAnabolics();
        }}
        renderEmptyData={() => {
          return (
            <View style={styles.emptyDate}>
              <Text
                style={[styles.text, { alignSelf: 'center', paddingTop: 50 }]}
              >
                No medications scheduled for this day.
              </Text>
            </View>
          );
        }}
        renderEmptyDate={() => {
          return (
            <View style={styles.emptyDate}>
              <Text
                style={[styles.text, { alignSelf: 'center', paddingTop: 50 }]}
              >
                No medications scheduled for this day.
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AgendaList;
