// app/layout.js
import './globals.css';
import ClientWrapper from './components/ClientWrapper';

export const metadata = {
  title: 'crypto-weather-nexus',
  description: 'An app combining crypto, weather, and news updates.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
