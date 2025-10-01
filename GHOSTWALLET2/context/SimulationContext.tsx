import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { generateLogEntry } from '@/utils/logGenerator';
import { CONFIG } from '@/config';

interface SimulationContextType {
  logs: string[];
  walletChecked: number;
  walletFounded: number;
  foundAmount: string;
  isRunning: boolean;
  selectedChains: string[];
  customAmount: string | null;
  balances: { [key: string]: string };
  bitcoinPrice: number | null;
  setSelectedChains: (chains: string[]) => void;
  setCustomAmount: (amount: string | null) => void;
  setFoundAmount: (amount: string) => void;
  setWalletChecked: (value: number) => void;
  setWalletFounded: (value: number) => void;
  setBalances: (balances: { [key: string]: string }) => void;
  updateBalance: (chainId: string, value: string) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  withdraw: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<string[]>(['GHOST WALLET INITIALIZED...', 'LOADING BLOCKCHAIN NODES...']);
  const [walletChecked, setWalletChecked] = useState(0);
  const [walletFounded, setWalletFounded] = useState(0);
  const [foundAmount, setFoundAmount] = useState<string>('$0');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [customAmount, setCustomAmount] = useState<string | null>(null);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [bitcoinPrice] = useState<number>(112803); // Prix fixe du Bitcoin
  const [walletFoundTiming] = useState<number>(10000); // Fixed 10 seconds

  const mountedRef = useRef(true);
  const isRunningRef = useRef(false);
  const logInterval = useRef<NodeJS.Timeout | null>(null);
  const counterInterval = useRef<NodeJS.Timeout | null>(null);
  const walletFoundInterval = useRef<NodeJS.Timeout | null>(null);

  const addLog = useCallback((message: string) => {
    setLogs(prev => {
      const newLogs = [...prev, message];
      return newLogs.slice(-CONFIG.MAX_LOGS);
    });
  }, []);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const startSimulation = useCallback(() => {
    const screenWidth = Dimensions.get('window').width;
    const isDesktop = screenWidth > 768;

    if (isRunningRef.current) return;
    
    setIsRunning(true);
    isRunningRef.current = true;
    setFoundAmount('$0');

    // Generate logs
    logInterval.current = setInterval(() => {
      addLog(generateLogEntry(selectedChains, isDesktop));
    }, 1000 / CONFIG.LOGS_PER_SECOND);

    // Increment wallet counter
    counterInterval.current = setInterval(() => {
      setWalletChecked(prev => prev + 10);
    }, 1.5);

    // Find wallet after 4 seconds and display custom amount
    walletFoundInterval.current = setInterval(() => {
      setWalletFounded(prev => prev + 1);
      
      if (customAmount) {
        // Use the exact custom amount as entered by user
        setFoundAmount(customAmount);
      } else {
        // Generate random amount
        const numericAmount = Math.random() * (CONFIG.FOUND_MAX - CONFIG.FOUND_MIN) + CONFIG.FOUND_MIN;
        const dollarAmount = `$${numericAmount.toFixed(2)}`;
        setFoundAmount(dollarAmount);
      }
      
      // Continue simulation even after wallet is found
      // Don't pause the simulation anymore
    }, walletFoundTiming);
  }, [selectedChains, addLog, customAmount, bitcoinPrice, walletFoundTiming]);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;

    if (logInterval.current) {
      clearInterval(logInterval.current);
      logInterval.current = null;
    }
    if (counterInterval.current) {
      clearInterval(counterInterval.current);
      counterInterval.current = null;
    }
    if (walletFoundInterval.current) {
      clearInterval(walletFoundInterval.current);
      walletFoundInterval.current = null;
    }

    addLog('BRUTE FORCE PAUSED - GHOSTWALLET 2.4');
  }, [addLog]);

  const withdraw = useCallback(() => {
    // This function is now only used for manual withdraw calls
    // The console screen handles its own reset logic
  }, [addLog]);

  const updateBalance = useCallback((chainId: string, value: string) => {
    setBalances(prev => ({
      ...prev,
      [chainId]: value
    }));
  }, []);

  const value: SimulationContextType = {
    logs,
    walletChecked,
    walletFounded,
    foundAmount,
    isRunning,
    selectedChains,
    customAmount,
    balances,
    bitcoinPrice,
    setSelectedChains,
    setCustomAmount,
    setFoundAmount,
    setWalletChecked,
    setWalletFounded,
    setBalances,
    updateBalance,
    startSimulation,
    stopSimulation,
    withdraw,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};