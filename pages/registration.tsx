import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getValidSessionsByToken } from '../util/database';

const errorStyles = css`
  color: red;
`;

const backgroundImage = css`
  background-image: url('/images/vienna.jpg');
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
`;

const containerStyle = css`
  height: 89vh;
  width: 90vw;
  border-radius: 30px;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  background-color: rgb(128, 128, 128, 0.8);
  color: white;
  box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
  h1 {
    padding-top: 20px;
    font-size: 32px;
  }

  button {
    margin: 15px 20px;
    height: 6vh;
    width: 12vw;
    border-radius: 30px;
    background-color: rgba(102, 199, 186);
    box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    &:hover {
      -webkit-box-shadow: 0px 0px 3px 8px rgba(220, 231, 231, 0.81);
      box-shadow: 0px 0px 3px 8px rgba(199, 221, 221, 0.81);
      -webkit-transition: box-shadow 0.3s ease-in-out;
      transition: box-shadow 0.3s ease-in-out;
    }
  }
`;

const inputContainerStyle = css`
  display: flex;
`;

const inputSectionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: white;
  font-weight: 800;
  margin: auto;
  label {
    display: inline-block;
    text-align: right;
    margin: 10px 15px;
    width: 480px;

    input {
      margin: 0px 45px 10px 15px;
      width: 250px;
      height: 35px;
      border-radius: 30px;
      text-align: center;
      border: none;
      box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    }
  }
`;
const aboutSectionStyle = css`
  display: flex;
  justify-content: center;
  color: white;
  font-weight: 800;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;

    input {
      display: flex;
      justify-content: center;
      width: 500px;
      height: 85px;
      border-radius: 30px;
      text-align: center;
      border: none;
      box-shadow: 9px 11px 21px -4px rgba(0, 0, 0, 0.66);
    }
  }
`;

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  cloudinaryAPI: string;
  userObject: { username: string };
};

export default function Registration(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');
  // const [uploadData, setUploadData] = useState();
  const [about, setAbout] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  const uploadImage = async (event: any) => {
    const files = event.currentTarget.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'profile_picture');

    const response = await fetch(
      `	https://api.cloudinary.com/v1_1/${props.cloudinaryAPI}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const file = await response.json();
    console.log('file url address', file.secure_url);

    setImage(file.secure_url);
  };
  return (
    <div css={backgroundImage}>
      <div>
        <Layout userObject={props.userObject} />
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta
            name="description"
            content="Register for this website on this page"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section css={containerStyle}>
          <h1>Register</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  username: username,
                  password: password,
                  occupation: occupation,
                  age: age,
                  about: about,
                  image: image,
                }),
              });

              const registerResponseBody = await registerResponse.json();

              if ('errors' in registerResponseBody) {
                setErrors(registerResponseBody.errors);
                return;
              }
              props.refreshUserProfile();
              await router.push('/users/protected-user');
            }}
          >
            <div css={inputContainerStyle}>
              <div css={inputSectionStyle}>
                <label>
                  First Name:{' '}
                  <input
                    value={firstName}
                    placeholder="First Name"
                    onChange={(event) =>
                      setFirstName(event.currentTarget.value)
                    }
                  />
                </label>
              </div>
              <div css={inputSectionStyle}>
                <label>
                  Last Name:{' '}
                  <input
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(event) => setLastName(event.currentTarget.value)}
                  />
                </label>
              </div>
            </div>
            <div css={inputContainerStyle}>
              <div css={inputSectionStyle}>
                <label>
                  Username:
                  <input
                    value={username}
                    placeholder="Username"
                    onChange={(event) => setUsername(event.currentTarget.value)}
                  />
                </label>
              </div>
              <div css={inputSectionStyle}>
                <label>
                  Password:
                  <input
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </label>
              </div>
            </div>
            <div css={inputContainerStyle}>
              <div css={inputSectionStyle}>
                <label>
                  Email:
                  <input
                    value={email}
                    placeholder="email"
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </label>
              </div>
              <div css={inputSectionStyle}>
                <label>
                  Occupation:
                  <input
                    value={occupation}
                    placeholder="Occupation"
                    onChange={(event) =>
                      setOccupation(event.currentTarget.value)
                    }
                  />
                </label>
              </div>
            </div>
            <div css={inputContainerStyle}>
              <div css={inputSectionStyle}>
                <label>
                  Age:
                  <input
                    value={age}
                    placeholder="Age"
                    onChange={(event) => setAge(event.currentTarget.value)}
                  />
                </label>
              </div>
              <div css={inputSectionStyle}>
                <label>
                  Upload an image:
                  <input type="file" name="image" onChange={uploadImage} />
                </label>
              </div>
            </div>
            <div>
              <div css={aboutSectionStyle}>
                <label>
                  Tell us about yourself:
                  <input
                    value={about}
                    type="textarea"
                    placeholder="About"
                    onChange={(event) => setAbout(event.currentTarget.value)}
                  />
                </label>
              </div>
            </div>
            <div>
              <button>Register</button>
            </div>
          </form>
          <div css={errorStyles}>
            {/* {JSON.stringify(errors)}
            {JSON.stringify(typeof errors)} */}
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/registration`,
        permanent: true,
      },
    };
  }
  // 1. Check if there is a token and if it is valid
  const token = context.req.cookies.sessionToken;
  const cloudinaryAPI = process.env.CLOUDINARY_NAME;

  if (token) {
    // 2. If the cookie is valid and redirect.
    const session = await getValidSessionsByToken(token);

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  // 3. otherwise, render the page
  return {
    props: {
      cloudinaryAPI,
    },
  };
}
