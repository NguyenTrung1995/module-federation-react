import React, { Suspense, useState } from 'react';

const Header = React.lazy(() => import('app1/Header'));
const Button = React.lazy(() => import('app1/Button'));

export default () => {
    const [count, setCount] = useState(0);

    console.log(count);

    return (
        <div style={{margin: '20px'}}>
          <Suspense fallback='Loading header'>
            <Header>Hello this is App 2</Header>
          </Suspense>
          <Suspense fallback='Loading button'>
            <Button onClick={() => setCount(count + 1)}>On Click {count}</Button>
          </Suspense>
        </div>
      )
};
