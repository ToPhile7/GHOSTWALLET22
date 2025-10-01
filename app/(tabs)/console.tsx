import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Animated, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { useSimulation } from '@/context/SimulationContext';
import { generateLogEntry } from '@/utils/logGenerator';
import { Check } from 'lucide-react-native';

function generateBitcoinAddress() {
  // Generate a formatted address like 1A8z9X...7mN4wV
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let start = '1A8z9X';
  let end = '7mN4wV';
  return `${start}...${end}`;
}

export default function ConsoleScreen() {
  const {
    logs,
    walletChecked,
    walletFounded,
    foundAmount,
    customAmount,
    isRunning,
    startSimulation,
    stopSimulation,
    withdraw,
    setFoundAmount,
    setWalletChecked,
    setWalletFounded,
  } = useSimulation();

  const [isWithdrawing, setIsWithdrawing] = React.useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
  const [withdrawAmount, setWithdrawAmount] = React.useState('');
  const [displayWalletChecked, setDisplayWalletChecked] = React.useState(0);

  const flatListRef = useRef<FlatList>(null);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const checkScale = useRef(new Animated.Value(0)).current;
  const checkRotate = useRef(new Animated.Value(0)).current;

  // Function to parse amount and calculate BTC
  const parseAmountAndCalculateBTC = (amount: string) => {
    // Remove $ and , symbols, keep only numbers and dots
    const cleanAmount = amount.replace(/[$,]/g, '');
    const numericAmount = parseFloat(cleanAmount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return { btc: '0.000', usd: '$0' };
    }
    
    // Calculate BTC with fixed Bitcoin price of $112,803
    const btcAmount = (numericAmount / 112803).toFixed(3);
    return { btc: btcAmount, usd: amount };
  };

  // Get the display amounts
  const getDisplayAmounts = () => {
    if (walletFounded > 0) {
      // Always use custom amount if set, otherwise use foundAmount
      const amountToUse = customAmount || foundAmount;
      console.log('Amount to use:', amountToUse); // Debug log
      return parseAmountAndCalculateBTC(amountToUse);
    }
    return { btc: '', usd: '' };
  };

  const displayAmounts = getDisplayAmounts();

  const screenWidth = Dimensions.get('window').width;
  const isDesktop = screenWidth > 768;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    if (!isRunning) {
      startSimulation();
    }
    
    return () => {
      stopSimulation();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    if (flatListRef.current && logs.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [logs]);

  // Animate wallet checked counter
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 9000; // 9 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < duration) {
        // Rapid increment during first 9 seconds
        setDisplayWalletChecked(prev => prev + Math.floor(Math.random() * 100) + 50);
        animationFrame = requestAnimationFrame(animate);
      } else {
        // After 9 seconds, jump to random number between 1-10 million
        const finalNumber = Math.floor(Math.random() * 9000000) + 1000000;
        setDisplayWalletChecked(finalNumber);
      }
    };

    if (isRunning) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRunning]);

  const handleStop = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, { duration: 100, toValue: 0.95, useNativeDriver: true }),
      Animated.timing(buttonScale, { duration: 100, toValue: 1, useNativeDriver: true }),
    ]).start();

    if (isRunning) {
      stopSimulation();
    } else {
      startSimulation();
    }
  };

  const handleWithdraw = () => {
    setWithdrawAmount(foundAmount);
    setIsWithdrawing(true);
    
    // Show loading for 0.5 seconds
    setTimeout(() => {
      setIsWithdrawing(false);
      setShowSuccessPopup(true);
      
      // Animate check icon
      Animated.parallel([
        Animated.spring(checkScale, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(checkRotate, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Hide popup after 3 seconds and call original withdraw
      setTimeout(() => {
        setShowSuccessPopup(false);
        checkScale.setValue(0);
        checkRotate.setValue(0);
        // Reset everything
        setFoundAmount('$0');
        setWalletChecked(0);
        setWalletFounded(0);
      }, 3000);
    }, 500);
  };

  const renderLogItem = ({ item, index }: { item: string; index: number }) => {
    // Check if this is a wallet found log
    if (item.startsWith('₿ Wallet Found :')) {
      return (
        <View key={index} style={styles.walletFoundLine}>
          <Text style={styles.walletFoundText}>{item}</Text>
        </View>
      );
    }

    return (
      <View key={index} style={styles.logLine}>
        <Text style={styles.logText} numberOfLines={1} ellipsizeMode="tail">
          {item.startsWith('Wallet Check:') ? (
            <>
              <Text style={[styles.logText, styles.boldText]}>Wallet Check:</Text>
              <Text style={styles.logText}>{item.substring(13)}</Text>
            </>
          ) : (
            item
          )}
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://theghostwallet.tech/wp-content/uploads/2025/10/newbackground.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Animated.View style={[styles.animatedContainer, {
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
          
          {/* Console Panel */}
          <View style={styles.consoleContainer}>
            <View style={styles.consolePanel}>
              <FlatList
                ref={flatListRef}
                data={logs}
                renderItem={renderLogItem}
                keyExtractor={(_, index) => index.toString()}
                style={styles.console}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={16}
                windowSize={10}
                initialNumToRender={20}
                getItemLayout={(data, index) => ({
                  length: 22,
                  offset: 22 * index,
                  index,
                })}
              />
            </View>
          </View>

          {/* Separator with Wallet Checked Counter */}
          <View style={styles.separator}>
            <Text style={styles.separatorText}>
              Wallet checked : {displayWalletChecked.toLocaleString()}
            </Text>
          </View>

          {/* Stats Panel */}
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[
                styles.statText,
                walletFounded > 0 && styles.walletFoundGlow
              ]}>
                ₿ WALLET FOUND : {walletFounded > 0 ? `${displayAmounts.btc} BTC` : ''}
              </Text>
              <Text style={styles.foundText}>
                Found: {walletFounded > 0 ? `$${displayAmounts.usd.replace('$', '')}` : '$0'}
              </Text>
            </View>
          </View>

          {/* Control Buttons */}
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonRow}>
              <Animated.View style={[styles.buttonHalf, { transform: [{ scale: buttonScale }] }]}>
                <TouchableOpacity
                  style={styles.stopButton}
                  onPress={handleStop}
                >
                  <Text style={styles.stopButtonText}>
                    {isRunning ? 'STOP' : 'START'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              
              <TouchableOpacity
                style={[styles.withdrawButton, styles.buttonHalf]}
                onPress={handleWithdraw}
              >
                <Text style={styles.withdrawButtonText}>WITHDRAW</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Loading Overlay */}
          {isWithdrawing && (
            <View style={styles.loadingOverlay}>
              <View style={styles.blurBackground} />
              <ActivityIndicator size="large" color="#39FF66" />
            </View>
          )}
          
          {/* Success Popup */}
          {showSuccessPopup && (
            <View style={styles.popupOverlay}>
              <View style={styles.blurBackground} />
              <View style={styles.popup}>
                <Animated.View style={[
                  styles.checkIconContainer,
                  {
                    transform: [
                      { scale: checkScale },
                      {
                        rotate: checkRotate.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  },
                ]}>
                  <Check size={40} color="#39FF66" strokeWidth={3} />
                </Animated.View>
                <Text style={styles.popupTitle}>Transaction Submitted!</Text>
                <Text style={styles.popupMessage}>
                  ${withdrawAmount} to {generateBitcoinAddress()}. Blockchain confirmation pending.
                </Text>
              </View>
            </View>
          )}
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
    padding: 15,
  },
  consoleContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    backgroundColor: '#000',
    marginTop: 20,
    padding: 10,
  },
  consolePanel: {
    flex: 1,
  },
  console: {
    flex: 1,
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#39FF66',
    lineHeight: 20,
    letterSpacing: 0.5,
    flex: 1,
  },
  logLine: {
    marginBottom: 2,
    flexDirection: 'row',
    flex: 1,
  },
  statsContainer: {
    marginTop: 20,
  },
  walletFoundedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bitcoinLogo: {
    fontSize: 18,
    color: '#39FF66',
    fontWeight: 'bold',
    marginRight: 8,
  },
  walletFoundedText: {
    fontSize: 16,
    color: '#39FF66',
  },
  statsBox: {
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    backgroundColor: '#000',
    padding: 15,
  },
  statText: {
    fontSize: 16,
    color: '#39FF66',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  walletFoundGlow: {
    textShadowColor: '#39FF66',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  foundText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF66',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonHalf: {
    flex: 1,
  },
  stopButton: {
    height: 60,
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    flex: 1,
  },
  stopButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#39FF66',
  },
  withdrawButton: {
    height: 60,
    backgroundColor: '#39FF66',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  withdrawButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
  },
  walletFoundLine: {
    marginBottom: 2,
    backgroundColor: 'rgba(57, 255, 102, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#39FF66',
  },
  walletFoundText: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#39FF66',
    textShadowColor: '#39FF66',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  separator: {
    height: 35,
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#000',
    marginTop: 20,
    marginBottom: 20,
  },
  separatorText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#39FF66',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  popup: {
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    padding: 30,
    margin: 20,
    alignItems: 'center',
    maxWidth: 350,
  },
  checkIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(57, 255, 102, 0.1)',
    borderWidth: 2,
    borderColor: '#39FF66',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39FF66',
    textAlign: 'center',
    marginBottom: 15,
  },
  popupMessage: {
    fontSize: 16,
    color: '#39FF66',
    textAlign: 'center',
    lineHeight: 22,
  },
});