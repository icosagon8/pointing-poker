import './Header.scss';
import { AppBar, IconButton, Toolbar, Container } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { Logo } from '../Logo/Logo';

export function Header(): JSX.Element {
  return (
    <AppBar className="header" position="static">
      <Container>
        <Toolbar className="header__wrapper" disableGutters>
          <Logo className="header__logo" />
          <IconButton className="header__chat-btn" color="inherit">
            <ChatOutlinedIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
