import { View, Text, Pressable, Image } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { Agenda } from 'react-native-calendars';
import { styles } from './styles';
import { colors } from '../../theme/theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { supabase } from '../../../server/server';

const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const AgendaList = () => {

  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});
  
    
  const renderItem = item => {
    return (
      <Pressable style={styles.item}>
        <Fontisto
          name={item.name === 'injection' ? 'injection-syringe' : 'pills'}
          size={20}
          color={item.name === 'injection' ? colors.primary : colors.orange}
          style={{ top: 20 }}
        />
        <View style={styles.itemsContent}>
          <Text style={styles.text}>{item.anabolic_used}</Text>
          <Text style={[styles.text, { color: 'gray', paddingTop: 5 }]}>
            {item.count}{' '}
          </Text>
        </View>
      </Pressable>
    );
  };

  

  return (
    <>
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
        
        markedDates={markedDates}
        showOnlySelectedDayItems={true}
        items={items}
        showClosingKnob={true}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}  
        selected={new Date()}
        nestedScrollEnabled={true}
        renderEmptyData={() => {
          return (
            <View style={styles.emptyDate}>
              <Text style={[styles.text, { alignSelf: 'center', paddingTop: 50 }]}>No medications scheduled for this day.</Text>
            </View>
          );
        }}
        renderEmptyDate={() => {
          return (
            <View style={styles.emptyDate}>
              <Text style={[styles.text, {alignSelf: 'center', paddingTop: 50}]}>No medications scheduled for this day.</Text>
            </View>
          );
        }}
      />
    </>
  );
};

export default AgendaList;
