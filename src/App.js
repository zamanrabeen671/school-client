import './App.css';
import AppRouter from './AppRouter';
import { DataProvider } from './Context/GlobalState';

function App() {
  return (
    <DataProvider>
      <AppRouter />
    </DataProvider>

  );
}

export default App;
