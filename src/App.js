import React, { lazy, Suspense, useState, useEffect } from 'react';

const Header = lazy(() => import('app1/Header'));
const Button = lazy(() => import('app1/Button'));
const App = lazy(() => import('app2/App'));

const BarChart = lazy(() => import('./components/chart/bar'));

export default () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080')
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);

    console.log(count);

    return (
        <div style={{margin: '20px'}}>
          <Suspense fallback='Loading header'>
            <Header>Hello this is Host 1</Header>
          </Suspense>
          <Suspense fallback='Loading button'>
            <Button onClick={() => setCount(count + 1)}>On Click {count} Host</Button>
          </Suspense>
          <Suspense fallback='Loading App'>
            <App />
          </Suspense>
          <Suspense fallback='Loading Chart'>
            <BarChart />
          </Suspense>
        </div>
      )
};
