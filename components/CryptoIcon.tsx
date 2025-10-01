import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
            <Text style={[styles.ethereumIcon, { fontSize: size * 0.6 }]}>Ξ</Text>
          </View>
        );
      case 'bsc':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.bscIcon, { fontSize: size * 0.6 }]}>B</Text>
          </View>
        );
      case 'solana':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.solanaIcon, { fontSize: size * 0.6 }]}>S</Text>
          </View>
        );
      case 'avalanche':
        return (
          <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.avalancheIcon, { fontSize: size * 0.6 }]}>A</Text>
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
  ethereumIcon: {
    color: '#39FF66',
    fontWeight: 'bold',
    textShadowColor: '#39FF66',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  solanaIcon: {
    color: '#39FF66',
    fontWeight: 'bold',
    textShadowColor: '#39FF66',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  avalancheIcon: {
    color: '#39FF66',
    fontWeight: 'bold',
    textShadowColor: '#39FF66',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    textAlign: 'center',
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