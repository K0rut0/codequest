import Providers from "./providers";

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
