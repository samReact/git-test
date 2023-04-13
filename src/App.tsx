import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { AppBar } from './components/AppBar';

import './styles/App.scss';
import { MemberShip } from './components/MemberShip';
import ChatGpt from './components/ChatGpt';

const queryClient = new QueryClient();

const App: FC = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/part2" element={<MemberShip />} />
        <Route path="/chat" element={<ChatGpt />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
