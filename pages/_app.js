import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  console.log(user);

  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    console.log(data);

    if ('errors' in data) {
      console.log(data.errors);
      setUser(undefined);
      return;
    }

    setUser(data.user);
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => {});
  }, [refreshUserProfile]);
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
          }
          main {
            margin: 0;
          }
        `}
      />
      <Component
        {...pageProps}
        userObject={user}
        refreshUserProfile={refreshUserProfile}
      />
    </>
  );
}

export default MyApp;
