import './Header.scss';
import { AppBar, IconButton, Toolbar, Container } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { useAppSelector, useAppDispatch } from '../../store/hooks/hooks';
import { Logo } from '../Logo/Logo';
import { on, off } from '../../store/slices/chatSlice';

export function Header(): JSX.Element {
  const isOpen = useAppSelector((state) => state.chat.isOpen);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    if (isOpen) {
      dispatch(off());
    } else {
      dispatch(on());
    }
  };

  return (
    <AppBar className="header" position="static">
      <Container>
        <Toolbar className="header__wrapper" disableGutters>
          <Logo className="header__logo" />
          <IconButton onClick={clickHandler} className="header__chat-btn" color="inherit">
            <ChatOutlinedIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
