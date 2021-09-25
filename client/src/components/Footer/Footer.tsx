import './Footer.scss';
import { Container } from '@material-ui/core';
import rsSchoolLogo from '../../assets/images/rsSchoolLogo.svg';
import githubLogo from '../../assets/images/githubLogo.svg';

export function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <div className="footer__developers">
          <p className="footer__developers-title">application developed:</p>
          <div className="footer__developers-wrapper">
            <img className="footer__developers-gh" src={githubLogo} alt="github" />
            <ul className="footer__developers-list">
              <li className="footer__developers-item">
                <a
                  className="footer__developers-link"
                  href="https://github.com/icosagon8"
                  target="_blank"
                  rel="noreferrer"
                >
                  icosagon8
                </a>
              </li>
              <li className="footer__developers-item">
                <a
                  className="footer__developers-link"
                  href="https://github.com/JimakPasha"
                  target="_blank"
                  rel="noreferrer"
                >
                  JimakPasha
                </a>
              </li>
              <li className="footer__developers-item">
                <a
                  className="footer__developers-link"
                  href="https://github.com/MaxZay"
                  target="_blank"
                  rel="noreferrer"
                >
                  MaxZay
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer__date-create">2021</p>
        <a className="footer__logo-link" href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img className="footer__logo-img" src={rsSchoolLogo} alt="rs-school" />
        </a>
      </Container>
    </footer>
  );
}
