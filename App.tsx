import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Navigation} from './src/navigation';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <Navigation />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

export default App;
