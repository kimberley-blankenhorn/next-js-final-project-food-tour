import { css } from '@emotion/react';

// import Link from 'next/link';
// import { AnchorHTMLAttributes } from 'react';
// import { User } from '../util/database';

const navStyle = css`
  display: flex;
  justify-content: space-between;
  color: rgba(102, 199, 186);
  font-weight: 700;
  margin: 0 20px;
  a {
    color: rgb(26, 19, 18);
  }
  a + a {
    margin: 0 20px;
  }
`;

// type Props = {
//   userObject?: User;
// };

// function Anchor({
//   children,
//   ...restProps
// }: AnchorHTMLAttributes<HTMLAnchorElement> & {
//   css?: Interpolation<Theme>;
// }) {
//   return <a {...restProps}>{children}</a>;
// }

export default function Header(props) {
  return (
    <header>
      <div css={navStyle}>
        {props.userObject && <div>{props.userObject.username}</div>}
      </div>
    </header>
  );
}
