import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { getUserByValidSessionToken } from '../../util/database';

const backgroundImage = css`
  background-image: url('/images/viennaNight.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  height: 100vh;
  width: 100vw;
`;

const containerStyle = css`
  height: 65vh;
  width: 80vw;
  margin: 30px auto;
  padding-bottom: 20px;
  text-align: center;
  background-color: rgb(128, 128, 128, 0.9);
  border-radius: 20px;
  color: white;
  overflow: auto;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  h2 {
    font-family: 'Dancing Script', cursive;
    font-size: 38px;
  }
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.9);
  }
`;
const layoutStyle = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  margin: 20px 20px;
  width: 70vw;
  margin: auto;
  img {
    object-fit: cover;
    height: 25vh;
    width: 13vw;
    border-radius: 20px;
    border: solid 3px white;
    padding: 10px;
    box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  }
  div {
    margin: auto;
  }
`;

const favoriteStyle = css`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 10px auto;
  color: white;
  text-align: center;
  font-size: 23px;
  width: 20vw;
  height: 10vh;
  border-radius: 20px;
  background-color: rgb(128, 128, 128, 0.8);
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  h1 {
    font-family: 'Playfair Display', serif;
  }
`;
const infoStyle = css`
  border: solid 3px white;
  border-radius: 30px;
  width: 25vw;
  background-color: rgba(91, 87, 87, 0.6);
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  h3 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
    font-family: 'Hind Guntur', sans-serif;
  }
`;

const favoritesSectionStyle = css`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-evenly;
  }
  h3 {
    font-size: 30px;
  }
`;

const listCardsStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 2px white;
  border-radius: 25px;
  /* padding: 10px; */
  height: 38vh;
  width: 15vw;
  background-color: rgba(91, 87, 87, 0.6);
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  color: #efe8ec;
  button {
    height: 5vh;
    width: 6vw;
    border-radius: 30px;
    margin: 0 3px;
    font-size: 16px;
    box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  }
  h4 {
    line-height: 20px;
    font-size: 18px;
  }
  img {
    object-fit: cover;
    height: 15vh;
    width: 7vw;
    border-radius: 30px;
    margin-top: -30px;
  }
`;
const deleteButtonStyle = css`
  background-color: rgba(241, 161, 175, 0.6);

  font-weight: 700;
  &:hover {
    -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
    box-shadow: 0px 0px 3px 6px rgba(235, 229, 234, 0.81);
    -webkit-transition: box-shadow 0.3s ease-in-out;
    transition: box-shadow 0.3s ease-in-out;
  }
`;
const toTourButtonStyle = css`
  background-color: rgba(102, 199, 186, 0.6);

  font-weight: 700;
  &:hover {
    -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
    box-shadow: 0px 0px 3px 6px rgba(235, 229, 234, 0.81);
    -webkit-transition: box-shadow 0.3s ease-in-out;
    transition: box-shadow 0.3s ease-in-out;
  }
`;

type Props = {
  userObject: { username: string };
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    occupation: string;
    age: number;
    about: string;
    image: string;
  };
};

export default function ProtectedUser(props: Props) {
  return (
    <div css={backgroundImage}>
      <div>
        <Layout userObject={props.userObject} />
        <Head>
          <title>
            {props.user.firstName} {props.user.lastName}
          </title>
          <meta
            name="description"
            content={`Hello ${props.user.firstName} ${props.user.lastName}. Welcome to your profile page.`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section>
          <div>
            <div css={favoriteStyle}>
              <h1>Profile</h1>
            </div>

            <div css={containerStyle}>
              <div>
                <h2>Welcome {props.user.username}</h2>
              </div>
              <div>
                <div css={layoutStyle}>
                  <div>
                    <img src={props.user.image} alt="profile" />
                  </div>
                  <div css={infoStyle}>
                    <h3>Info</h3>
                    <p>First Name: {props.user.firstName}</p>
                    <hr />
                    <p>Last Name: {props.user.lastName}</p>
                    <hr />
                    <p>Occupation: {props.user.occupation}</p>
                    <hr />
                    <p>Age: {props.user.age}</p>
                    <hr />
                    <p>email: {props.user.email}</p>
                    <hr />
                    <p>About: {props.user.about}</p>
                  </div>
                </div>
                <div css={favoritesSectionStyle}>
                  <h3>Favorites</h3>
                  <div>
                    <div css={listCardsStyle}>
                      <h4>Johanna's Coffee Spots</h4>
                      <img src="/images/woman1.jpg" alt="Johanna profile" />
                      <div>
                        <button css={toTourButtonStyle}>To Tour</button>
                        <button css={deleteButtonStyle}>Delete</button>
                      </div>
                    </div>
                    <div css={listCardsStyle}>
                      <h4>Susanna's Indian restaurants</h4>
                      <img
                        src="/images/lastProfileImage.jpg"
                        alt="Susanna profile"
                      />
                      <div>
                        <button css={toTourButtonStyle}>To Tour</button>
                        <button css={deleteButtonStyle}>Delete</button>
                      </div>
                    </div>
                    <div css={listCardsStyle}>
                      <h4>Joe's Hangout spots</h4>
                      <img src="/images/man2.jpg" alt="Joe's profile" />
                      <div>
                        <button css={toTourButtonStyle}>To Tour</button>
                        <button css={deleteButtonStyle}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get a user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // 2. If there is a user, return and render page
  if (user) {
    return {
      props: { user: user },
    };
  }
  // 3. Otherwise redirect to login
  return {
    redirect: {
      destination: `/login?returnTo=users/protected-user`,
      permanent: false,
    },
  };
}
