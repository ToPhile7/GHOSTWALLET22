import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar, View } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SimulationProvider } from '@/context/SimulationContext';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#000000');

    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        html, body {
          overflow: hidden !important;
          height: 100%;
          margin: 0;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const errorMessage = args.join(' ');
        if (errorMessage.includes('MetaMask') ||
            errorMessage.includes('ethereum') ||
            errorMessage.includes('chrome-extension')) {
          return;
        }
        originalError.apply(console, args);
      };

      // Fix iOS PWA keyboard focus issue
      const setupInputFocus = () => {
        document.querySelectorAll('input, textarea').forEach((el) => {
          const inputEl = el as HTMLInputElement | HTMLTextAreaElement;

          inputEl.addEventListener('touchend', (e) => {
            e.preventDefault();
            setTimeout(() => {
              inputEl.focus();
              inputEl.selectionStart = inputEl.value.length;
            }, 150);
          });

          inputEl.addEventListener('click', () => {
            setTimeout(() => {
              inputEl.focus();
              inputEl.selectionStart = inputEl.value.length;
            }, 150);
          });
        });
      };

      // Handle body styles when keyboard opens/closes
      const handleFocusIn = () => {
        document.body.style.position = 'static';
        document.body.style.overflow = 'visible';
      };

      const handleFocusOut = () => {
        document.body.style.position = '';
        document.body.style.overflow = '';
      };

      window.addEventListener('focusin', handleFocusIn);
      window.addEventListener('focusout', handleFocusOut);

      // iOS-specific scroll fix
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        window.addEventListener('focusin', () => window.scrollTo(0, 0));
      }

      // Run initially and also after DOM updates
      setupInputFocus();
      const observer = new MutationObserver(setupInputFocus);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        window.removeEventListener('focusin', handleFocusIn);
        window.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, []);

  return (
    <SimulationProvider>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </SimulationProvider>
  );
}