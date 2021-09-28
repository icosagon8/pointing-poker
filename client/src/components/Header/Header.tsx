import './Header.scss';
import { useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Container } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks/hooks';
import { Logo } from '../Logo/Logo';
import { on, off } from '../../store/slices/chatSlice';

export function Header(): JSX.Element {
  const isOpen = useAppSelector((state) => state.chat.isOpen);
  const dispatch = useAppDispatch();
  const clickHandler = () => dispatch(isOpen ? off() : on());
  const location = useLocation();
  const [isChatButtonDisplay, setChatIsButtonDisplay] = useState<boolean>(false);

  useEffect(() => {
    setChatIsButtonDisplay(location.pathname !== '/');
  }, [location]);

  return (
    <AppBar className="header" position="static">
      <Container>
        <Toolbar className="header__wrapper" disableGutters>
          <Logo className="header__logo" />
          {isChatButtonDisplay && (
            <IconButton onClick={clickHandler} className="header__chat-btn" color="inherit">
              <ChatOutlinedIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
