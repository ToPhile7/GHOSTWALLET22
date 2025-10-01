# Ghost Wallet - Cryptocurrency Wallet Finder Simulation

🚨 **IMPORTANT SAFETY NOTE**: This application is a **SIMULATION ONLY**. It does not access real blockchain networks, handle actual cryptocurrency, or manage real private keys. This is purely for entertainment and educational purposes.

## Overview

Ghost Wallet is a simulated mobile app that creates the illusion of "finding" lost cryptocurrency wallets. The app features a cyberpunk-themed interface with neon green styling and realistic blockchain console output.

## Features

- **Login Screen**: Enter any username to access the app
- **Blockchain Selection**: Choose from Bitcoin, Ethereum, BSC, Solana, and Avalanche
- **Real-time Console**: Scrolling terminal with simulated blockchain activity
- **Wallet Discovery**: Finds a "wallet" every 7 seconds with random values between $734.85 - $10,249
- **Interactive Controls**: Stop/start simulation and withdraw (reset) functionality

## Installation & Setup

1. **Prerequisites**:
   ```bash
   npm install -g expo-cli
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Run on Device**:
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or run on iOS Simulator / Android Emulator

## Configuration

All simulation parameters can be adjusted in `config.ts`:

```typescript
export const CONFIG = {
  WALLET_FOUND_INTERVAL_MS: 7000,  // Wallet found every 7 seconds
  LOGS_PER_SECOND: 10,             // Console log generation rate
  CHECK_INCREMENT_PER_SEC: 1000,   // Wallet counter increment rate
  FOUND_MIN: 734.85,               // Minimum found amount
  FOUND_MAX: 10249,                // Maximum found amount
};
```

## How It Works

### Simulation Logic
1. **Console Logs**: Generated at ~10 lines per second with realistic blockchain terminology
2. **Wallet Counter**: Increases continuously at ~1000 per second
3. **Wallet Discovery**: Every 7 seconds exactly, a new "wallet" is found with a random value
4. **State Management**: React Context manages all simulation state across screens

### Navigation Flow
1. **Login** → Enter any username → Access button
2. **Chains** → Select blockchains (or default to all) → Start search
3. **Console** → Real-time simulation with Stop/Withdraw controls

## Technical Architecture

- **Framework**: Expo React Native with TypeScript
- **Navigation**: Expo Router (Stack Navigator)
- **State**: React Context for global simulation state
- **Styling**: StyleSheet with neon green theme (#39FF66)
- **Performance**: FlatList virtualization for console logs

## Project Structure

```
├── app/
│   ├── _layout.tsx              # Root layout with context provider
│   └── (tabs)/
│       ├── _layout.tsx          # Tab navigation layout
│       ├── index.tsx            # Login screen
│       ├── chains.tsx           # Blockchain selection
│       └── console.tsx          # Simulation console
├── context/
│   └── SimulationContext.tsx    # Global simulation state
├── utils/
│   └── logGenerator.ts          # Console log generation
└── config.ts                    # Configuration constants
```

## Safety & Legal

⚠️ **This is a simulation only. Key points**:
- No real blockchain connections
- No actual cryptocurrency handling
- No private key generation or storage
- All values and transactions are fake
- For entertainment purposes only

## Build for Production

1. **Web Build**:
   ```bash
   npm run build:web
   ```

2. **Mobile Build** (requires EAS CLI):
   ```bash
   npx eas build --platform ios
   npx eas build --platform android
   ```

## Troubleshooting

- **Performance**: Console uses virtualized FlatList with 100-log buffer
- **Memory**: Logs are automatically pruned to prevent memory leaks
- **Timing**: All intervals use exact timing (7-second wallet discovery)

---

**Disclaimer**: This application is for simulation and entertainment purposes only. Do not use this app to attempt accessing real cryptocurrency wallets or blockchain networks.