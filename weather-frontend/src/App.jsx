import AuthProvider from './AuthProvider';
import Home from './Home';

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;