import { css, Interpolation, Theme } from '@emotion/react';
import Link from 'next/link';

// import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { User } from '../util/database';
// import { User } from '../util/database';

const navStyle = css`
  display: flex;
  justify-content: space-between;
  height: 70px;
  background-color: rgb(203, 204, 204, 0.8);
  margin-bottom: 50px;
  a {
    color: black;
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color 1s;
    border-bottom: 1px solid transparent;

    transition: all ease-in-out 0.5s;
    margin: 0 20px;

    &:hover {
      color: rgba(102, 199, 186);
      border-color: rgba(102, 199, 186);
    }
  }
`;
const logoStyle = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  color: rgb(26, 19, 18);
  a {
    color: black;
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color 1s;
    border-bottom: 1px solid transparent;
    font-family: 'Lobster', cursive;
    transition: all ease-in-out 0.5s;
    margin: 0 20px;
    &:hover {
      color: rgba(102, 199, 186);
      border-color: rgba(102, 199, 186);
    }
  }
`;
const bodyStyles = css`
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* width: 100vw; */
  color: rgb(26, 19, 18);
  p {
    font-size: 16px;
    font-weight: 700;
    font-style: italic;
  }
`;

type Props = {
  userObject?: User;
};

function Anchor({
  children,
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  css?: Interpolation<Theme>;
}) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  return (
    <header>
      <nav>
        <div css={navStyle}>
          <div css={logoStyle}>
            <Link href="/">
              <a>FoodiesUnited</a>
            </Link>
          </div>
          <div css={bodyStyles}>
            {props.userObject && <p>Welcome {props.userObject.username}</p>}
            {props.userObject ? (
              <Anchor href="/logout">Logout</Anchor>
            ) : (
              <>
                <Link href="/registration">
                  <a>Register</a>
                </Link>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </>
            )}
            <Link href="/createTour">
              <a>Create List</a>
            </Link>
            <Link href="/tours">
              <a>Lists</a>
            </Link>
            <Link href="/users/protected-user">
              <a>Profile</a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
