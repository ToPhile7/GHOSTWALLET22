const LOG_TEMPLATES = [
  'WALLET CHECKED',
  'VERIFYING SIGNATURES...',
  'BLOCKCHAIN SYNC: 99.96%',
  'PUSHING NOTIFICATION...',
  'AUTH TOKEN REFRESHED',
  'ENCRYPTION KEYS ROTATED #{}',
  'LOGGING EVENT: txid=0x{}...',
  'CLEANUP TEMP FILES #{}',
  'IDLE...',
  'INIT NETWORK ADAPTERS...',
  'ESTABLISHING SECURE CHANNEL...',
  'TLS HANDSHAKE OK',
  'SCAN ADDRESSES...',
  'VERIFYING SIGNATURES...',
  'PROCESSING BLOCK #{}',
  'MEMPOOL SIZE: {} tx',
  'NODE SYNC STATUS: ACTIVE',
  'CHECKING WALLET ENTROPY...',
  'VALIDATING MERKLE TREE...',
  'PEER CONNECTION ESTABLISHED',
  'DOWNLOADING BLOCKCHAIN DATA...',
  'CRYPTOGRAPHIC HASH VERIFIED',
  'SIGNATURE VALIDATION COMPLETE',
  'BLOCK HEIGHT: {}',
  'TRANSACTION POOL UPDATED',
  'CONSENSUS ALGORITHM ACTIVE',
  'NETWORK LATENCY: {} ms',
  'CHECKING BTC ADDRESS: {}',
  'SCANNING ETH WALLET: {}',
  'VALIDATING BSC ADDRESS: {}',
  'PROBING SOL ACCOUNT: {}',
  'TESTING AVAX WALLET: {}',
  'FOUND PRIVATE KEY FOR: {}',
  'BALANCE CHECK (BTC) {}: {} BTC',
  'BALANCE CHECK (ETH) {}: {} ETH',
  'BALANCE CHECK (BSC) {}: {} BNB',
  'BALANCE CHECK (SOL) {}: {} SOL',
  'BALANCE CHECK (AVAX) {}: {} AVAX',
  'MNEMONIC_FORMAT',
];

const CHAINS = [
  { id: 'BTC', name: 'bitcoin', ticker: 'BTC' },
  { id: 'ETH', name: 'ethereum', ticker: 'ETH' },
  { id: 'BSC', name: 'bsc', ticker: 'BNB' },
  { id: 'SOL', name: 'solana', ticker: 'SOL' },
  { id: 'AVAX', name: 'avalanche', ticker: 'AVAX' },
];

const SEED_WORDS = [
  'kite', 'banana', 'cat', 'xylophone', 'giant', 'daring', 'jungle', 'lion', 'universe', 'pearl', 'rose', 'wonder',
  'night', 'wonder', 'orange', 'ocean', 'music', 'violet', 'cat', 'xenon', 'fancy', 'night', 'abandon', 'universe',
  'yellow', 'banana', 'abandon', 'lion', 'queen', 'ivory', 'abandon', 'fancy', 'yellow', 'river', 'rose', 'dog',
  'lion', 'violet', 'mountain', 'ability', 'silver', 'tree', 'dog', 'valley', 'garden', 'silver', 'quest', 'sun',
  'jacket', 'garden', 'jacket', 'violet', 'river', 'umbrella', 'ocean', 'happy', 'kite', 'rose', 'universe', 'xenon',
  'rose', 'river', 'yacht', 'lemon', 'daring', 'candle', 'kite', 'sun', 'yacht', 'night', 'harbor', 'fancy',
  'lemon', 'xylophone', 'music', 'forest', 'valley', 'yacht', 'nature', 'sun', 'dog', 'umbrella', 'xylophone', 'ocean',
  'ivory', 'daring', 'ivory', 'mountain', 'yacht', 'mountain', 'jacket', 'king', 'silver', 'ability', 'queen', 'mountain',
  'violet', 'tree', 'xenon', 'zenith', 'banana', 'jungle', 'harbor', 'night', 'yacht', 'earth', 'harbor', 'queen',
  'xylophone', 'ivory', 'tiger', 'silver', 'dog', 'garden', 'kite', 'sun', 'tree', 'xylophone', 'ability', 'forest',
  'sun', 'kite', 'ocean', 'umbrella', 'garden', 'daring', 'sun', 'cat', 'zebra', 'rose', 'night', 'mountain',
  'zebra', 'valley', 'wonder', 'umbrella', 'earth', 'happy', 'valley', 'cat', 'queen', 'fancy', 'night', 'zebra',
  'valley', 'yacht', 'wonder', 'banana', 'eagle', 'xenon', 'silver', 'jacket', 'umbrella', 'river', 'tiger', 'violet',
  'tree', 'river', 'banana', 'tiger', 'cat', 'lemon', 'ivory', 'lion', 'lemon', 'jacket', 'earth', 'silver',
  'orange', 'queen', 'night', 'harbor', 'tiger', 'candle', 'silver', 'banana', 'kite', 'tree', 'night', 'violet',
  'zebra', 'dog', 'daring', 'lion', 'quest', 'fancy', 'orange', 'island', 'umbrella', 'ability', 'night', 'orange',
  'daring', 'river', 'candle', 'ability', 'wolf', 'earth', 'tree', 'giant', 'sun', 'earth', 'abandon', 'tree',
  'sun', 'river', 'eagle', 'silver', 'xenon', 'cat', 'yacht', 'garden', 'banana', 'eagle', 'xenon', 'quest',
  'ivory', 'daring', 'jacket', 'fancy', 'fancy', 'nature', 'umbrella', 'nature', 'tiger', 'rose', 'nature', 'earth',
  'ocean', 'quest', 'fancy', 'daring', 'earth', 'ability', 'jungle', 'wonder', 'king', 'fancy', 'piano', 'queen',
  'harbor', 'nature', 'valley', 'wolf', 'silver', 'universe', 'xylophone', 'nature', 'garden', 'forest', 'candle', 'fancy',
  'music', 'valley', 'river', 'pearl', 'universe', 'river', 'ability', 'umbrella', 'abandon', 'music', 'music', 'music',
  'xenon', 'giant', 'abandon', 'piano', 'dog', 'harbor', 'jacket', 'ocean', 'xylophone', 'rose', 'valley', 'xylophone',
  'garden', 'umbrella', 'violet', 'zenith', 'river', 'nature', 'forest', 'silver', 'queen', 'abandon', 'candle', 'universe',
  'giant', 'universe', 'violet', 'forest', 'earth', 'xylophone', 'ivory', 'banana', 'wolf', 'ocean', 'ocean', 'jungle',
  'umbrella', 'yacht', 'yacht', 'abandon', 'jacket', 'rose', 'river', 'garden', 'xenon', 'jacket', 'orange', 'cat',
  'banana', 'lemon', 'ability', 'valley', 'universe', 'sun', 'happy', 'island', 'ocean', 'cat', 'daring', 'earth',
  'giant', 'zebra', 'king', 'ivory', 'zebra', 'harbor', 'wolf', 'xylophone', 'night', 'lion', 'abandon', 'earth',
  'violet', 'quest', 'garden', 'universe', 'queen', 'rose', 'mountain', 'cat', 'mountain', 'lemon', 'umbrella', 'abandon',
  'ability', 'abandon', 'island', 'xylophone', 'daring', 'zebra', 'candle', 'valley', 'jungle', 'island', 'wonder', 'wolf',
  'yacht', 'wolf', 'universe', 'jungle', 'breeze', 'abandon', 'garden', 'zebra', 'earth', 'xylophone', 'lion', 'forest',
  'silver', 'mountain', 'zebra', 'yellow', 'umbrella', 'earth', 'ability', 'tree', 'fancy', 'zebra', 'giant', 'ivory',
  'lemon', 'daring', 'nature', 'forest', 'silver', 'sun', 'night', 'earth', 'zebra', 'music', 'wolf', 'abandon',
  'violet', 'forest', 'xylophone', 'cat', 'lion', 'universe', 'giant', 'silver', 'tree', 'yellow', 'valley', 'xenon',
  'eagle', 'music', 'quest', 'lion', 'giant', 'garden', 'universe', 'harbor', 'ability', 'king', 'breeze', 'yellow',
  'violet', 'lemon', 'fancy', 'tiger', 'harbor', 'pearl', 'banana', 'nature', 'zenith', 'candle', 'candle', 'banana',
  'xenon', 'silver', 'giant', 'banana', 'piano', 'king', 'island', 'happy', 'dog', 'zebra', 'nature', 'lemon',
  'lemon', 'kite', 'island', 'jungle', 'zebra', 'candle', 'valley', 'garden', 'yellow', 'eagle', 'orange', 'ivory',
  'quest', 'island', 'music', 'cat', 'breeze', 'mountain', 'dog', 'fancy', 'yellow', 'zebra', 'quest', 'kite',
  'night', 'music', 'breeze', 'candle', 'wolf', 'zenith', 'candle', 'zenith', 'forest', 'silver', 'fancy', 'forest',
  'orange', 'kite', 'ivory', 'fancy', 'violet', 'xylophone', 'lemon', 'queen', 'xylophone', 'ocean', 'eagle', 'ability',
  'zebra', 'daring', 'mountain', 'jacket', 'zenith', 'garden', 'orange', 'violet', 'quest', 'tree', 'eagle', 'jacket',
  'eagle', 'kite', 'ability', 'orange', 'tree', 'candle', 'earth', 'garden', 'zenith', 'queen', 'ability', 'tiger',
  'tiger', 'forest', 'river', 'ocean', 'piano', 'silver', 'zebra', 'music', 'lion', 'harbor', 'island', 'ivory',
  'river', 'river', 'island', 'ocean', 'breeze', 'breeze', 'yellow', 'sun', 'yellow', 'jacket', 'island', 'forest',
  'queen', 'daring', 'nature', 'giant', 'giant', 'umbrella', 'quest', 'breeze', 'umbrella', 'kite', 'universe', 'rose',
  'pearl', 'pearl', 'ability', 'lion', 'wonder', 'kite', 'wolf', 'zebra', 'tiger', 'pearl', 'harbor', 'night',
  'kite', 'music', 'fancy', 'earth', 'sun', 'queen', 'abandon', 'music', 'king', 'lemon', 'yellow', 'tiger',
  'sun', 'lion', 'lion', 'forest', 'dog', 'lion', 'wonder', 'sun', 'harbor', 'happy', 'zebra', 'jungle',
  'quest', 'ivory', 'music', 'jungle', 'jungle', 'rose', 'xylophone', 'tree', 'zebra', 'zebra', 'river', 'rose',
  'mountain', 'jacket', 'dog', 'breeze', 'rose', 'earth', 'candle', 'violet', 'yellow', 'xylophone', 'king', 'yacht',
  'candle', 'fancy', 'nature', 'wonder', 'wolf', 'valley', 'happy', 'tree', 'wolf', 'queen', 'wolf', 'giant',
  'happy', 'eagle', 'harbor', 'happy', 'piano', 'zebra', 'earth', 'tiger', 'music', 'quest', 'forest', 'zebra',
  'jacket', 'yacht', 'happy', 'xenon', 'banana', 'yellow', 'valley', 'abandon', 'night', 'fancy', 'eagle', 'ocean',
  'xylophone', 'orange', 'valley', 'rose', 'happy', 'jacket', 'banana', 'rose', 'nature', 'pearl', 'music', 'night',
  'jacket', 'garden', 'queen', 'fancy', 'forest', 'universe', 'wonder', 'wolf', 'lion', 'fancy', 'ability', 'nature',
  'river', 'ivory', 'lemon', 'silver', 'lion', 'xenon', 'wonder', 'cat', 'king', 'garden', 'jungle', 'garden',
  'breeze', 'quest', 'mountain', 'giant', 'universe', 'harbor', 'breeze', 'candle', 'queen', 'orange', 'tiger', 'eagle',
  'yellow', 'music', 'kite', 'xenon', 'zebra', 'universe', 'xylophone', 'yellow', 'zenith', 'earth', 'xenon', 'silver',
  'night', 'valley', 'island', 'garden', 'silver', 'king', 'king', 'fancy', 'cat', 'tree', 'ocean', 'orange',
  'piano', 'wonder', 'tiger', 'harbor', 'zenith', 'harbor', 'river', 'tree', 'jacket', 'jungle', 'harbor', 'zebra',
  'piano', 'river', 'jacket', 'violet', 'nature', 'tiger', 'eagle', 'king', 'zenith', 'piano', 'breeze', 'king',
  'lion', 'zebra', 'zebra', 'dog', 'daring', 'breeze', 'king', 'lion', 'xenon', 'cat', 'xenon', 'ability',
  'garden', 'candle', 'silver', 'jungle', 'tree', 'lion', 'sun', 'candle', 'cat', 'umbrella', 'candle', 'xenon',
  'forest', 'wonder', 'daring', 'pearl', 'harbor', 'yellow', 'zebra', 'umbrella', 'zebra', 'valley', 'ocean', 'xenon',
  'pearl', 'quest', 'pearl', 'tree', 'earth', 'eagle', 'yellow', 'xylophone', 'kite', 'mountain', 'umbrella', 'banana',
  'kite', 'breeze', 'island', 'ocean', 'silver', 'orange', 'night', 'xenon', 'candle', 'wolf', 'silver', 'wolf',
  'xenon', 'pearl', 'orange', 'nature', 'garden', 'king', 'cat', 'zenith', 'earth', 'wonder', 'kite', 'wolf',
  'ability', 'rose', 'happy', 'fancy', 'kite', 'yellow', 'lemon', 'orange', 'orange', 'earth', 'rose', 'xenon',
  'kite', 'universe', 'yellow', 'quest', 'night', 'abandon', 'jacket', 'zenith', 'valley', 'island', 'candle', 'kite',
  'wonder', 'yacht', 'garden', 'quest', 'xenon', 'ocean', 'yacht', 'orange', 'tiger', 'tiger', 'valley', 'abandon',
  'cat', 'lion', 'garden', 'yellow', 'quest', 'abandon', 'kite', 'yellow', 'daring', 'tree', 'cat', 'fancy',
  'valley', 'kite', 'tree', 'night', 'lemon', 'ability', 'ocean', 'candle', 'piano', 'harbor', 'ocean', 'ocean',
  'valley', 'daring', 'valley', 'abandon', 'xenon', 'abandon', 'lion', 'zebra', 'island', 'sun', 'cat', 'valley',
  'piano', 'quest', 'kite', 'pearl', 'night', 'zebra', 'harbor', 'umbrella', 'music', 'wonder', 'jacket', 'zebra',
  'giant', 'candle', 'ivory', 'night', 'rose', 'tiger', 'tree', 'ivory', 'cat', 'yellow', 'king', 'piano',
  'kite', 'banana', 'ivory', 'jungle', 'umbrella', 'forest', 'breeze', 'kite', 'yellow', 'orange', 'mountain', 'universe',
  'rose', 'ability', 'happy', 'mountain', 'island', 'nature', 'ocean', 'pearl', 'fancy', 'tiger', 'orange', 'candle',
  'daring', 'happy', 'yacht', 'harbor', 'zebra', 'harbor', 'kite', 'violet', 'garden', 'garden', 'harbor', 'pearl',
  'queen', 'yellow', 'ivory', 'dog', 'lion', 'xenon', 'dog', 'yellow', 'zebra', 'pearl', 'xylophone', 'eagle',
  'orange', 'earth', 'daring', 'violet', 'sun', 'piano', 'banana', 'ability', 'banana', 'violet', 'valley', 'yellow',
  'happy', 'daring', 'ability', 'island', 'xylophone', 'dog', 'fancy', 'nature', 'tiger', 'music', 'king', 'sun',
  'night', 'tiger', 'xylophone', 'valley', 'river', 'xenon', 'abandon', 'daring', 'wolf', 'jungle', 'kite', 'orange',
  'breeze', 'xylophone', 'river', 'kite', 'candle', 'lion', 'ability', 'lion', 'wolf', 'garden', 'lion', 'lemon',
  'wolf', 'island', 'valley', 'jacket', 'dog', 'tiger', 'universe', 'eagle', 'candle', 'king', 'mountain', 'orange',
  'fancy', 'tiger', 'daring', 'violet', 'pearl', 'ivory', 'lion', 'forest', 'king', 'tiger', 'river', 'yacht',
  'zebra', 'harbor', 'breeze', 'zenith', 'zebra', 'lion', 'banana', 'cat', 'valley', 'island', 'music', 'eagle',
  'silver', 'jungle', 'candle', 'silver', 'yacht', 'violet', 'music', 'fancy', 'happy', 'wonder', 'mountain', 'lion',
  'mountain', 'quest', 'xylophone', 'fancy', 'wonder', 'queen', 'lion', 'wonder', 'zebra', 'jacket', 'quest', 'forest',
  'nature', 'lemon', 'zenith', 'banana', 'sun', 'jungle', 'sun', 'ivory', 'lion', 'queen', 'yellow', 'ivory',
  'ivory', 'ocean', 'yellow', 'banana', 'candle', 'rose', 'universe', 'silver', 'mountain', 'ivory', 'giant', 'earth',
  'piano', 'silver', 'river', 'candle', 'king', 'pearl', 'zebra', 'umbrella', 'garden', 'umbrella', 'ability', 'abandon',
  'kite', 'lion', 'fancy', 'jungle', 'yacht', 'valley', 'mountain', 'piano', 'cat', 'yacht', 'island', 'ocean',
  'xylophone', 'dog', 'silver', 'queen', 'eagle', 'earth', 'happy', 'pearl', 'harbor', 'jacket', 'orange', 'jungle',
  'nature', 'ivory', 'ivory', 'umbrella', 'tiger', 'happy', 'universe', 'abandon', 'harbor', 'breeze', 'sun', 'tiger',
  'fancy', 'universe', 'xylophone', 'candle', 'zenith', 'universe', 'xylophone', 'eagle', 'ability', 'nature', 'giant', 'wolf',
  'valley', 'mountain', 'abandon', 'daring', 'daring', 'yacht', 'silver', 'queen', 'orange', 'valley', 'daring', 'happy',
  'zenith', 'ability', 'music', 'ocean', 'music', 'zenith', 'pearl', 'queen', 'garden', 'tree', 'giant', 'kite',
  'king', 'abandon', 'dog', 'harbor', 'zenith', 'jungle', 'abandon', 'violet', 'happy', 'zebra', 'dog', 'universe',
  'lemon', 'xenon', 'garden', 'umbrella', 'happy', 'mountain', 'queen', 'ability', 'piano', 'valley', 'abandon', 'violet',
  'candle', 'wonder', 'harbor', 'banana', 'valley', 'kite', 'island', 'wonder', 'candle', 'xenon', 'wonder', 'tree',
  'lemon', 'breeze', 'rose', 'daring', 'pearl', 'kite', 'banana', 'banana', 'garden', 'music', 'lemon', 'river',
  'cat', 'tree', 'lemon', 'wolf', 'abandon', 'abandon', 'universe', 'jacket', 'fancy', 'valley', 'tree', 'eagle',
  'harbor', 'river', 'fancy', 'violet', 'tiger', 'garden', 'tiger', 'garden', 'jacket', 'cat', 'zebra', 'breeze',
  'river', 'piano', 'daring', 'banana', 'happy', 'lemon', 'jacket', 'giant', 'daring', 'umbrella', 'pearl', 'violet',
  'xylophone', 'fancy', 'island', 'king', 'lemon', 'dog', 'ability', 'valley', 'sun', 'jacket', 'breeze', 'eagle',
  'nature', 'wolf', 'quest', 'cat', 'orange', 'zebra', 'fancy', 'ivory', 'cat', 'violet', 'tree', 'banana',
  'sun', 'wolf', 'cat', 'kite', 'yellow', 'garden', 'harbor', 'wolf', 'lion', 'yellow', 'xylophone', 'garden',
  'breeze', 'queen', 'valley', 'candle', 'mountain', 'quest', 'xylophone', 'giant', 'universe', 'universe', 'forest', 'banana',
  'yellow', 'wonder', 'nature', 'night', 'xylophone', 'violet', 'piano', 'xenon', 'yellow', 'pearl', 'dog', 'jacket'
];

const generateRandomHash = (length: number = 6): string => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateRandomNumber = (min: number = 1000, max: number = 9999): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomBalance = (): string => {
  const balance = (Math.random() * 100).toFixed(3);
  return balance;
};

const generateBitcoinAddress = (): string => {
  const prefixes = ['1', '3', 'bc1'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  if (prefix === 'bc1') {
    // Bech32 address (shortened for readability)
    const chars = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    let address = 'bc1q';
    for (let i = 0; i < 6; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address + '...';
  } else {
    // Legacy or P2SH address (shortened)
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let address = prefix;
    for (let i = 1; i < 7; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address + '...';
  }
};

const generateEthereumAddress = (): string => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 6; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address + '...';
};

const generateSolanaAddress = (): string => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let address = '';
  for (let i = 0; i < 7; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address + '...';
};

const generateCryptoAddress = (chain: string): string => {
  switch (chain) {
    case 'BTC':
      return generateBitcoinAddress();
    case 'ETH':
    case 'BSC':
    case 'AVAX':
      return generateEthereumAddress();
    case 'SOL':
      return generateSolanaAddress();
    default:
      return generateEthereumAddress();
  }
};

const generateSeedPhrase = (maxLength: number = 50, isDesktop: boolean = false): string => {
  const shuffled = [...SEED_WORDS].sort(() => 0.5 - Math.random());
  // On desktop: always 12 words, on mobile: 8-12 words
  const wordCount = isDesktop ? 12 : Math.min(12, Math.floor(Math.random() * 5) + 8); // Desktop: 12, Mobile: 8-12
  const phrase = shuffled.slice(0, wordCount).join(' ');
  
  // Add ellipsis only on mobile, show full phrase on desktop
  return isDesktop ? phrase : phrase + '...';
};

let logCounter = 0;

export const generateLogEntry = (selectedChains: string[] = [], isDesktop: boolean = false): string => {
  // Always use wallet check format
  const useMnemonicFormat = true;
  
  if (useMnemonicFormat) {
    // Get available chains
    const availableChains = selectedChains.length > 0 
      ? CHAINS.filter(c => selectedChains.includes(c.name))
      : CHAINS;
    
    const chain = availableChains[Math.floor(Math.random() * availableChains.length)];
    const address = generateCryptoAddress(chain.id);
    const mnemonic = generateSeedPhrase(45, isDesktop);
    
    return `Wallet Check: ${mnemonic}`;
  }
  
  return template.replace('{}', mnemonic);
  
  // Get available chains
  const availableChains = selectedChains.length > 0 
    ? CHAINS.filter(c => selectedChains.includes(c.name))
    : CHAINS;
  
  const chain = availableChains[Math.floor(Math.random() * availableChains.length)];
  
  let log = template;
  
  // Replace placeholders
  log = log.replace(/\{\}/g, () => {
    const random = Math.random();
    if (random < 0.15) {
      return generateRandomHash();
    } else if (random < 0.35) {
      return generateRandomNumber().toString();
    } else if (random < 0.55) {
      return generateRandomBalance();
    } else if (random < 0.75) {
      return generateCryptoAddress(chain.id);
    } else {
      return generateRandomNumber(100, 50000).toLocaleString();
    }
  });

  // Special handling for address-specific templates
  if (template.includes('ADDRESS:') || template.includes('WALLET:') || template.includes('ACCOUNT:')) {
    log = log.replace(/\{\}/g, () => generateCryptoAddress(chain.id));
  }
  
  // Special handling for balance checks
  if (template.includes('BALANCE CHECK')) {
    const address = generateCryptoAddress(chain.id);
    const balance = generateRandomBalance();
    log = log.replace(/\{\}/g, (match, offset) => {
      if (log.indexOf('{}', offset) === log.indexOf('{}')) {
        return address;
      } else {
        return balance;
      }
    });
  }

  // Add chain prefix for blockchain-specific operations
  if (Math.random() < 0.4 && (
    template.includes('BALANCE CHECK') || 
    template.includes('ADDRESS:') || 
    template.includes('WALLET') ||
    template.includes('ACCOUNT') ||
    template.includes('CHECKING') ||
    template.includes('SCANNING') ||
    template.includes('VALIDATING') ||
    template.includes('PROBING') ||
    template.includes('TESTING')
  )) {
    log = `[${chain.name}] ${log}`;
  }

  return log;
};