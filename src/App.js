import React, { Suspense, useState } from 'react';

const Header = React.lazy(() => import('app1/Header'));
const Button = React.lazy(() => import('app1/Button'));
const App = React.lazy(() => import('app2/App'));

export default () => {
    const [count, setCount] = useState(0);

    console.log(count);

    return (
        <div style={{margin: '20px'}}>
          <Suspense fallback='Loading header'>
            <Header>Hello this is Host</Header>
          </Suspense>
          <Suspense fallback='Loading button'>
            <Button onClick={() => setCount(count + 1)}>On Click {count} Host</Button>
          </Suspense>
          <Suspense fallback='Loading App'>
            <App />
          </Suspense>
        </div>
      )
};
