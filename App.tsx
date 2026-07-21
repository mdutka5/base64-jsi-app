import { type JSX, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Base64TurboModule from './specs/NativeBase64Module';

function App(): JSX.Element {
  const [encodeQuery, setEncodeQuery] = useState('');
  const [decodeQuery, setDecodeQuery] = useState('');
  const [encodedValue, setEncodedValue] = useState('');
  const [decodedValue, setDecodedValue] = useState('');

  const handleEncodePress = () => {
    setEncodedValue(Base64TurboModule.encode(encodeQuery));
  };

  const handleDecodePress = () => {
    setDecodedValue(Base64TurboModule.decode(decodeQuery));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexOne}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <Text style={styles.title}>C++ Base64 Tool</Text>
          <Text style={styles.subtitle}>
            Fast native binary string transformation
          </Text>

          {/* Encoder Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Encode</Text>
            <Text style={styles.label}>Write text to encode:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Hello World"
              placeholderTextColor="#9ca3af"
              onChangeText={setEncodeQuery}
              value={encodeQuery}
            />
            <TouchableOpacity style={styles.button} onPress={handleEncodePress}>
              <Text style={styles.buttonText}>Encode String</Text>
            </TouchableOpacity>

            {encodedValue ? (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Encoded Output:</Text>
                <Text selectable style={styles.resultValue}>
                  {encodedValue}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Decoder Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Decode</Text>
            <Text style={styles.label}>Write Base64 string to decode:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. SGVsbG8gV29ybGQ="
              placeholderTextColor="#9ca3af"
              onChangeText={setDecodeQuery}
              value={decodeQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleDecodePress}
            >
              <Text style={styles.buttonTextSecondary}>Decode String</Text>
            </TouchableOpacity>

            {decodedValue ? (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Decoded Output:</Text>
                <Text selectable style={styles.resultValue}>
                  {decodedValue}
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc', // Soft, modern light background
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    // Elevation / Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#2563eb', // Royal Blue primary action
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#0f172a', // Dark accent action for decoding
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', // Monospace for Base64 text
    color: '#0f172a',
  },
});

export default App;
