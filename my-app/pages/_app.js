import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from '../src/store';
import MainLayout from '../src/components/layout/MainLayout';
import AuthGuard from '../src/gaurds/AuthGuard';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>User Management App</title>
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 6,
          },
        }}
      >
        <AuthGuard>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthGuard>
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;