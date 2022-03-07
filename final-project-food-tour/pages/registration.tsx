import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const backgroundImage = css`
  background-image: url('/images/vienna.jpg');
  background-position: center;
  background-repeat: no-repeat;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
`;

const navStyle = css`
  display: flex;
  justify-content: space-between;
  a {
    color: white;
    font-weight: 700;
    text-decoration: none;
  }
  a + a {
    margin: 0 20px;
    padding: 20px 0;
  }
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

  button {
    margin-top: 50px;
    height: 50px;
    width: 200px;
  }
`;

const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  border: solid red 1px;
  color: rgb(26, 19, 18);
`;

const inputContainerStyle = css`
  display: flex;
  /* width: 100%; */
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
    }
  }
`;

export default function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');
  const [about, setAbout] = useState('');

  return (
    <div css={backgroundImage}>
      <div>
        <Head>
          <title>FoodiesUnited - A Restaurant Sharing Website</title>
          <meta
            name="description"
            content="Register for this website on this page"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <nav>
          <div css={navStyle}>
            <div css={bodyStyles}>
              <Link href="/">
                <a>FoodiesUnited</a>
              </Link>
            </div>
            <div css={bodyStyles}>
              <Link href="/createTour">
                <a>Create Tour</a>
              </Link>
              <Link href="/tours">
                <a>Tours</a>
              </Link>
              <Link href="/">
                <a>Login</a>
              </Link>
            </div>
          </div>
        </nav>
        <section css={containerStyle}>
          <h1>Register</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,
                  username: username,
                  password: password,
                  email: email,
                  occupation: occupation,
                  age: age,
                  image: image,
                  about: about,
                }),
              });
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
                  <input
                    value={image}
                    type="file"
                    placeholder="image"
                    onChange={(event) => setImage(event.currentTarget.value)}
                  />
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
        </section>
      </div>
    </div>
  );
}
