import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Loading from './components/global/Loading';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     suspense: true,
  //   },
  // },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.Suspense fallback={<Loading />}>
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ReactQueryDevtools initialIsOpen={true} />
      <App />
    </RecoilRoot>
  </QueryClientProvider>
  //</React.Suspense>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
