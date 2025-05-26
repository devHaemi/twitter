import { useState } from 'react';
import { getAuth } from 'firebase/auth';

import { app } from 'firebaseApp';
import Layout from 'components/Layout';
import Router from 'components/Router';

function App() {
  const auth = getAuth(app);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  return (
    <Layout>
      <Router isAuthenticated={isAuthenticated} />
    </Layout>
  );
}

export default App;
