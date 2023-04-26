'use client';

import { store } from '@/features/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import '../styles/global.css';
import '../styles/theme.scss';
import AuthSessionProvider from './AuthSessionProvider';

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by David M',
// };

const queryClient = new QueryClient();

function RootLayout({ children }: IChildren): React.ReactElement {
  return (
    <html lang='fr'>
      <body>
        <Provider store={store}>
          <AuthSessionProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </AuthSessionProvider>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
