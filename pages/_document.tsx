import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id='portal-root'></div> {/* Add the portal root here */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
