import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const MoodScreen = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

  const fetchMoods = async () => {
    const user = auth.currentUser; 
    const email = user ? user.email : "anonymous";
    
    try {
      const moodCollection = collection(db, 'moods');
      const moodQuery = query(moodCollection, where('email', '==', email));
      const moodSnapshot = await getDocs(moodQuery);

      const moodList = moodSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));


      const sortedMoodList = moodList.sort((a, b) => {
        return b.timeStamp.toDate() - a.timeStamp.toDate();
      });

      if (sortedMoodList.length > 0) {
        setMoodData(sortedMoodList);
      } else {
        setMoodData([]);
        console.log("No mood data found for this user.");
      }
    } catch (err) {
      console.error("Error fetching mood data: ", err);
      setError("Failed to load mood data.");
    } finally {
      setLoading(false);
      setRefreshing(false); 
    }
  };

  useEffect(() => {
    fetchMoods();
  }, [db, auth]);

  const onRefresh = () => {
    setRefreshing(true); 
    fetchMoods(); 
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ab9e7f" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Mood Records</Text>
      <ScrollView 
        contentContainerStyle={styles.historyList}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor="#ab9e7f"
          />
        }
      >
        {moodData.length > 0 ? (
          moodData.map((item, index) => (
            <View key={index} style={styles.historyBox}>
              <Text style={styles.historyText}>Mood: {item.mood}</Text>
              <Text style={styles.historyText}>Mood Type: {item.moodType}</Text>
              <Text style={styles.historyText}>
                Timestamp: {new Date(item.timeStamp?.toDate()).toLocaleString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No mood data recorded.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ab9e7f',
  },
  historyList: {
    paddingBottom: 20,
  },
  historyBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyText: {
    fontSize: 16,
    marginVertical: 2,
    color:'#ab9e7f',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  noDataText: {
    fontSize: 18,
    color: '#ab9e7f',
  },
});

export default MoodScreen;
