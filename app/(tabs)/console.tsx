import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Animated, Dimensions, ActivityIndicator, ImageBackground, TextInput } from 'react-native';
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
  const [showEditPopup, setShowEditPopup] = React.useState(false);
  const [editValue, setEditValue] = React.useState('');
  const lastTapTime = useRef(0);

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

  // Animate wallet checked counter (57211 per minute)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !showEditPopup) {
      // 57211 per minute = 57211/60 per second = 953.52 per second
      // Update every 50ms = 20 times per second
      // So increment by 953.52/20 = 47.68 per update
      interval = setInterval(() => {
        setDisplayWalletChecked(prev => prev + 48);
      }, 50);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, showEditPopup]);

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

  const handleWalletCheckedDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapTime.current < DOUBLE_TAP_DELAY) {
      // Double tap detected - pause simulation
      stopSimulation();
      setEditValue(displayWalletChecked.toString());
      setShowEditPopup(true);
    }

    lastTapTime.current = now;
  };

  const handleEditConfirm = () => {
    const numValue = parseInt(editValue.replace(/,/g, ''), 10);
    if (!isNaN(numValue) && numValue >= 0) {
      setDisplayWalletChecked(numValue);
    }
    setShowEditPopup(false);
    setEditValue('');
    // Resume simulation
    startSimulation();
  };

  const handleEditCancel = () => {
    setShowEditPopup(false);
    setEditValue('');
    // Resume simulation
    startSimulation();
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
        opacity: fadeAnim
      }]}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <ImageBackground
              source={{ uri: 'https://theghostwallet.tech/wp-content/uploads/2025/10/ghostwallet-1.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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

          {/* Wallet Checked Counter without border - double tap to edit */}
          <TouchableOpacity
            onPress={handleWalletCheckedDoubleTap}
            activeOpacity={0.7}
          >
            <Text style={styles.separatorText}>
              Wallet checked : {displayWalletChecked.toLocaleString()}
            </Text>
          </TouchableOpacity>

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

          {/* Edit Wallet Checked Popup */}
          {showEditPopup && (
            <View style={styles.popupOverlay}>
              <View style={styles.blurBackground} />
              <View style={styles.popup}>
                <Text style={styles.popupTitle}>Edit Wallet Checked</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={editValue}
                    onChangeText={setEditValue}
                    keyboardType="numeric"
                    placeholder="Enter number"
                    placeholderTextColor="#39FF6666"
                    autoFocus
                    inputMode="numeric"
                  />
                </View>
                <View style={styles.editButtonRow}>
                  <TouchableOpacity
                    style={[styles.editButton, styles.cancelButton]}
                    onPress={handleEditCancel}
                  >
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.editButton, styles.confirmButton]}
                    onPress={handleEditConfirm}
                  >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
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
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 60,
  },
  consoleContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    backgroundColor: '#000',
    marginTop: 60,
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
    fontSize: 14,
    color: '#39FF66',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: -5,
    paddingLeft: 5,
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
    zIndex: 1002,
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
  inputContainer: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#39FF66',
    borderRadius: 10,
    backgroundColor: '#000',
    color: '#39FF66',
    fontSize: 18,
    paddingHorizontal: 15,
    fontFamily: 'monospace',
  },
  editButtonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  editButton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: '#39FF66',
    backgroundColor: '#000',
  },
  confirmButton: {
    backgroundColor: '#39FF66',
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#39FF66',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});