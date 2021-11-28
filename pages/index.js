import ContainerBlock from '../components/ContainerBlock';
import Script from 'next/script';
import Hero from '../components/Hero';
import getLatestRepos from '@lib/getLatestRepos';
import userData from '@constants/data';
import AboutMe from '@components/AboutMe';
import Experience from '@components/Experience';
import Head from 'next/head';

export default function Home({ repositories }) {
  return (
    <ContainerBlock
      title="Adrián Villanueva - Software Engineer"
      description="Portfolio of Adrian Villanueva - Software engineer from Amsterdam"
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      <Hero />
      <AboutMe />
      <Experience />
    </ContainerBlock>
  );
}

export const getServerSideProps = async () => {
  let token = process.env.GITHUB_AUTH_TOKEN;
  const repositories = await getLatestRepos(userData, token);

  return {
    props: {
      repositories,
    },
  };
};
