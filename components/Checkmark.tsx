import { css } from '@emotion/react'

const CheckmarkStyles = (checked: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
  border-radius: 5px;
  border: ${checked ? 'none' : '2px solid hsl(200, 60%, 60%)'};
  margin-right: 10px;
  background-color: ${checked ? 'hsl(200, 60%, 60%)' : 'transparent'};

  &:after {
    content: '';
    display: ${checked ? 'block' : 'none'};
    width: 3px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`

const Checkmark = ({ checked }: { checked: boolean }) => (
  <span css={CheckmarkStyles(checked)} />
)

export default Checkmark
