import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ImageBackground, Animated, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import CryptoIcon from '@/components/CryptoIcon';
import { useSimulation } from '@/context/SimulationContext';

interface Chain {
  id: string;
  name: string;
  icon: string;
  txSpeed: string;
  status: string;
}

const chains: Chain[] = [
  { id: 'bitcoin', name: 'Bitcoin', icon: '₿', txSpeed: '7/10', status: 'Standard' },
  { id: 'ethereum', name: 'Ethereum', icon: '◈', txSpeed: '7/10', status: 'Standard' },
  { id: 'bsc', name: 'BSC', icon: '◉', txSpeed: '7/10', status: 'Standard' },
  { id: 'solana', name: 'Solana', icon: '◎', txSpeed: '7/10', status: 'Standard' },
  { id: 'avalanche', name: 'Avalanche', icon: '▲', txSpeed: '7/10', status: 'Standard' },
];

export default function BalanceScreen() {
  const { balances, updateBalance, setBalances } = useSimulation();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState('0.00');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const successAnim = React.useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;
  const isDesktop = screenWidth > 768;
  const backgroundSource = isDesktop
    ? require('../../assets/images/newbackground.png')
    : require('../../assets/images/newbackground.png');


  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleBack = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
    });
  };

  const handleWithdraw = () => {
    setIsWithdrawing(true);
    
    // Calculate total amount before clearing balances
    const total = Object.values(balances).reduce((sum, value) => {
      const numValue = parseFloat(value || '0');
      return sum + (isNaN(numValue) ? 0 : numValue);
    }, 0);
    setTotalAmount(total.toFixed(2));
    
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setBalances({});
      setIsWithdrawing(false);
      setShowSuccess(true);
      
      // Animate success message
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
      // Hide success message after 2 seconds
      setTimeout(() => {
        Animated.timing(successAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowSuccess(false);
        });
      }, 2000);
    }, 2000);
  };

  return (
    <ImageBackground
      source={backgroundSource}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Animated.View style={[styles.animatedContainer, {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backArrow} onPress={handleBack}>
              <ChevronLeft size={24} color="#39FF66" />
            </TouchableOpacity>
          
            {/* Loading Overlay */}
            {isWithdrawing && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#39FF66" />
                <Text style={styles.loadingText}>Processing withdrawal...</Text>
              </View>
            )}
          
            {/* Success Message */}
            {showSuccess && (
              <Animated.View style={[styles.successOverlay, { opacity: successAnim }]}>
                <Text style={styles.successText}>✓ Withdraw Successful</Text>
                <Text style={styles.totalAmountText}>You receive: ${totalAmount}</Text>
              </Animated.View>
            )}
          
            <View style={styles.titleContainer}>
              <Text style={styles.title}>SET{'\n'}BALANCE AMOUNTS :</Text>
            </View>
          
            <ScrollView style={styles.chainsContainer} showsVerticalScrollIndicator={false}>
              {chains.map((chain) => (
                <View key={chain.id} style={styles.chainCard}>
                  <View style={styles.chainContent}>
                    <CryptoIcon chainId={chain.id} size={40} />
                    <View style={styles.chainInfo}>
                      <Text style={styles.chainName}>{chain.name}</Text>
                    </View>
                    <TextInput
                      style={styles.balanceInput}
                      placeholder="0.00"
                      placeholderTextColor="#666"
                      value={balances[chain.id] || ''}
                      onChangeText={(value) => updateBalance(chain.id, value)}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.withdrawButton, isWithdrawing && styles.disabledButton]} 
                onPress={handleWithdraw}
                disabled={isWithdrawing}
              >
                <Text style={styles.withdrawButtonText}>WITHDRAW</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
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
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF66',
    textAlign: 'center',
    letterSpacing: 2,
  },
  chainsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  chainCard: {
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#000',
  },
  chainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  chainInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chainName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#39FF66',
  },
  balanceInput: {
    width: 100,
    height: 40,
    borderWidth: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#39FF66',
    backgroundColor: 'transparent',
    textAlign: 'right',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 15,
  },
  withdrawButton: {
    height: 60,
    backgroundColor: '#39FF66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    height: 60,
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF66',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: '#39FF66',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  successOverlay: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    zIndex: 1001,
  },
  successText: {
    color: '#39FF66',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalAmountText: {
    color: '#39FF66',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  backArrow: {
    position: 'absolute', 
    top: 60,
    left: 30,
    zIndex: 1000,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(57, 255, 102, 0.2)',
    borderWidth: 1,
    borderColor: '#39FF66',
  },
});