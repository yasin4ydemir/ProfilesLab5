import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { api } from '../api/client';

export default function ProfileDetailScreen({ route }) {
  const { id } = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/profiles/${id}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{flex: 1}} size="large" />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>NAME</Text>
        <Text style={styles.value}>{profile?.name}</Text>
        <Text style={styles.label}>EMAIL</Text>
        <Text style={styles.value}>{profile?.email}</Text>
        <Text style={styles.label}>AGE</Text>
        <Text style={styles.value}>{profile?.age}</Text>
        <Text style={styles.label}>BIO</Text>
        <Text style={styles.bioText}>{profile?.bio}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', margin: 16, padding: 20, borderRadius: 12 },
  label: { fontSize: 12, color: '#666', fontWeight: '600', marginBottom: 4 },
  value: { fontSize: 18, color: '#333', fontWeight: 'bold', marginBottom: 16 },
  bioText: { fontSize: 16, color: '#333', lineHeight: 24 }
});