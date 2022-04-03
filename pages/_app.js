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
            padding: 0;
            margin: 0;

            font-family: 'Dancing Script', cursive;
            font-family: 'Hind Guntur', sans-serif;

            main {
              margin: 0;
            }
            button {
              font-family: 'Cormorant Garamond', serif;
              font-size: 17px;
              font-weight: 800;
              color: rgb(56, 56, 53);
              border: solid 1px white;
            }
            h1 {
              font-family: 'Dancing Script', cursive;
            }

            h2,
            h4 {
              font-family: 'Playfair Display', serif;
            }
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
