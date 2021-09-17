import './Footer.scss';
import { Container } from '@material-ui/core';
import rsSchoolLogo from '../../assets/images/rsSchoolLogo.svg';

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__developers">
          <h5 className="footer__developers__title">application developed:</h5>
          <ul className="footer__developers-list">
            <li className="footer__developers-item">
              <a className="footer__developers-link" href="https://github.com/icosagon8">
                icosagon8
              </a>
            </li>
            <li className="footer__developers-item">
              <a className="footer__developers-link" href="https://github.com/JimakPasha">
                JimakPasha
              </a>
            </li>
            <li className="footer__developers-item">
              <a className="footer__developers-link" href="https://github.com/MaxZay">
                MaxZay
              </a>
            </li>
          </ul>
        </div>
        <p className="footer__date-create">2021</p>
        <a className="footer__logo-link" href="https://rs.school/react/">
          <img className="footer__logo-img" src={rsSchoolLogo} alt="rs-school" />
        </a>
      </Container>
    </footer>
  );
}