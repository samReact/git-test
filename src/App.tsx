import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './components/Home';
import { AppBar } from './components/AppBar';

import './styles/App.scss';

const queryClient = new QueryClient();

const App: FC = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBar />
      <Home />
    </QueryClientProvider>
  );
};

export default App;
