import '../styles/global.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { FoodProvider } from '../context/FoodContext';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <FoodProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FoodProvider>
  );
};

export default MyApp;
