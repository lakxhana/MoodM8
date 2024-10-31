import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import clinicsData from '../assets/clinics.json'; // Adjust the path as needed

const ClinicsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {

    setClinics(clinicsData);
  }, []);

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = 
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? clinic.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mental Health Clinics</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for clinics..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <View style={styles.filterContainer}>
        {['Counselling', 'Psychiatry', 'Clinical Psychology'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.selectedFilterButton
            ]}
            onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCategory === category && styles.selectedFilterButtonText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredClinics}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.clinicContainer}>
            <Text style={styles.clinicName}>{item.name}</Text>
            <Text style={styles.clinicAddress}>{item.address}</Text>
            <Text style={styles.clinicPhone}>{item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ab9e7f',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ab9e7f',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#afcfd6',
  },
  selectedFilterButton: {
    backgroundColor: '#b9dddc',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedFilterButtonText: {
    color: '#ffffff',
  },
  clinicContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ab9e7f',
  },
  clinicAddress: {
    fontSize: 16,
    color: '#666',
  },
  clinicPhone: {
    fontSize: 16,
    color: '#ab9e7f',
  },
});

export default ClinicsScreen;
