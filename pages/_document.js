import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@material-ui/core/styles';
import {name} from '../data.json'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" style={{overflowX: "hidden"}}>
                <Head>
                    <meta charSet='utf-8'/>
                    {/* PWA primary color */}
                    <meta name="theme-color" content="black"/>
                    <meta name="description" content={`Portfolio of ${name}`}/>
                    <meta name='keywords' content={'Portfolio ' + name + ' skills projects experience resume'}/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="manifest" href="/manifest.webmanifest"/>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4QVJVTG7BQ"/>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                window.dataLayer = window.dataLayer || [];
	            function gtag() {
		            dataLayer.push(arguments);
	            }
	            gtag("js", new Date());
	            gtag("config", "G-4QVJVTG7BQ");`
                        }}
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
