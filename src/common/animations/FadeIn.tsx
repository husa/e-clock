import './fadeIn.scss';

import Animation from './Animation';

const FadeIn = ({ children }) => (
  <Animation name="fadeIn" timeout={[400, 700, 700]}>
    {children}
  </Animation>
);

export default FadeIn;
