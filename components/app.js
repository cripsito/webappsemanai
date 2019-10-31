import Head from './head';
import Nav from './nav';

const App = ({ children }) => (
  <main style={{ backgroundColor: 'white' }}>
    <Head title="Semana I" id="top" />
    {children}
  </main>
);
export default App;
