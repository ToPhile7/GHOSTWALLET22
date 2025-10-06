import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Platform, Animated, Dimensions, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';
import { useSimulation } from '@/context/SimulationContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { setCustomAmount, setFoundAmount } = useSimulation();

  const screenWidth = Dimensions.get('window').width;
  const isDesktop = screenWidth > 768;


  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleAccess = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      router.push('/(tabs)/chains');
    });
  };

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Enter') {
      handleAccess();
    }
  };
  const handleSkullClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickTimer) {
      clearTimeout(clickTimer);
    }
    
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 2000);
    
    setClickTimer(timer);
    
    if (clickCount + 1 === 3) {
      setClickCount(0);
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
      
      if (Platform.OS === 'web') {
        const value = window.prompt('Enter the amount you want to find:');
        if (value !== null) {
          setCustomAmount(value);
          setFoundAmount(value);
          window.alert(`Montant personnalisé défini à "${value}". Chaque portefeuille trouvé affichera exactement ce texte.`);
        }
      } else {
        Alert.prompt(
          'Custom Amount',
          'Enter the amount you want to find in each wallet:',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Set',
              onPress: (value) => {
                if (value !== undefined && value !== null) {
                  setCustomAmount(value);
                  Alert.alert('Success', `Montant personnalisé défini à "${value}". Chaque portefeuille trouvé affichera exactement ce texte.`);
                }
              },
            },
          ],
          'plain-text'
        );
      }
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://theghostwallet.tech/wp-content/uploads/2025/10/newbackground.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <TouchableOpacity style={styles.skullContainer} onPress={handleSkullClick}>
              <Image
                source={{ uri: 'https://theghostwallet.tech/wp-content/uploads/2025/10/skull-1.png' }}
                style={styles.skullImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Image
              source={{ uri: 'https://theghostwallet.tech/wp-content/uploads/2025/10/ghostwallet-1.png' }}
              style={styles.titleImage}
              resizeMode="contain"
            />
          </View>

          {/* Form Section: Username Input and Access Button */}
          <View style={styles.formSection}>
            <Text style={styles.usernameLabel}>Enter your username</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#666"
              value={username}
              onChangeText={setUsername}
              onKeyPress={handleKeyPress}
              autoCapitalize="none"
              autoCorrect={false}
            />
          <TouchableOpacity style={styles.accessButton} onPress={handleAccess}>
            <Text style={styles.accessButtonText}>Access</Text>
          </TouchableOpacity>
          </View>

          {/* Footer */}
          <TouchableOpacity style={styles.footer}>
            <Text style={styles.footerText}>
              You don't have a license? <Text style={styles.boldText}>Buy here.</Text>
            </Text>
            <Text style={styles.footerText}>Need help? Telegram</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  animatedContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 150,
  },
  skullContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  skullImage: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: -50,
    justifyContent: 'center',
  },
  titleImage: {
    width: 300,
    height: 60,
  },
  // New styles for formSection and usernameLabel
  formSection: {
    // This will now be treated as a single block by 'space-between'
    // We can use gap to control spacing between its children
    gap: 10, // Adjust this value to control spacing between label, input, and button
    marginTop: 40, // Adjust overall spacing from the title
  },
  usernameLabel: {
    fontSize: 16,
    color: '#39FF66', // Neon green color
    textAlign: 'center',
    marginBottom: 5, // Small gap between label and input
  },
  input: {
    height: 60,
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  accessButton: {
    height: 60, // This is already 0, no change needed
    backgroundColor: '#39FF66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  accessButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});