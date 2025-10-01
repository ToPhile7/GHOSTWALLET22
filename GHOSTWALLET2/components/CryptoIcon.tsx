import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CryptoIconProps {
  chainId: string;
  size?: number;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ chainId, size = 40 }) => {
  const getIconComponent = () => {
    switch (chainId) {
      case 'bitcoin':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.bitcoinIcon, { fontSize: size * 0.7 }]}>₿</Text>
          </View>
        );
      case 'ethereum':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Image 
              source={require('../assets/images/DfXSzOi.png')}
              style={[styles.ethereumImage, { width: size * 0.7, height: size * 0.7 }]}
              resizeMode="contain"
            />
          </View>
        );
      case 'bsc':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Image 
              source={require('../assets/images/bnb.png')}
              style={[styles.cryptoImage, { width: size * 0.7, height: size * 0.7 }]}
              resizeMode="contain"
            />
          </View>
        );
      case 'solana':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Image 
              source={require('../assets/images/solana.png')}
              style={[styles.cryptoImage, { width: size * 0.7, height: size * 0.7 }]}
              resizeMode="contain"
            />
          </View>
        );
      case 'avalanche':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Image 
              source={require('../assets/images/avalanche.png')}
              style={[styles.cryptoImage, { width: size * 0.7, height: size * 0.7 }]}
              resizeMode="contain"
            />
          </View>
        );
      default:
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.defaultIcon, { fontSize: size * 0.6 }]}>?</Text>
          </View>
        );
    }
  };

  return getIconComponent();
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(57, 255, 102, 0.1)',
    borderWidth: 1,
    borderColor: '#39FF66',
    display: 'flex',
    flexDirection: 'column',
  },
  bitcoinIcon: {
    color: '#39FF66',
    fontWeight: 'bold',
    textShadowColor: '#39FF66',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    textAlign: 'center',
    lineHeight: undefined,
  },
  ethereumImage: {
    tintColor: '#39FF66',
    shadowColor: '#39FF66',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    alignSelf: 'center',
  },
  defaultIcon: {
    color: '#39FF66',
    fontWeight: 'bold',
  },
  bscIcon: {
    color: '#39FF66',
    fontWeight: 'bold',
    textShadowColor: '#39FF66',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  cryptoImage: {
    tintColor: '#39FF66',
    shadowColor: '#39FF66',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    alignSelf: 'center',
  },
  binanceImage: {
    shadowColor: '#39FF66',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
});

export default CryptoIcon;