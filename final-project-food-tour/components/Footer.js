import { css } from '@emotion/react';

const footerStyle = css`
  display: flex;
  justify-content: space-evenly;
  /* margin: 40px 0; */
  padding-bottom: 40px;
  color: rgb(11, 3, 0);
`;
const footerRowStyle = css`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 23px;
  }
`;

export default function Footer() {
  return (
    <div css={footerStyle}>
      <div css={footerRowStyle}>
        <p>Contact</p>
      </div>
      <div css={footerRowStyle}>
        <p>Partners</p>
      </div>
      <div css={footerRowStyle}>
        <p>Impressum</p>
      </div>
    </div>
  );
}
