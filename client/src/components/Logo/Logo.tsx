import logo from '../../assets/images/logo.png';

interface Props {
  className: string;
}

export function Logo(props: Props): JSX.Element {
  const { className } = props;
  return <img className={className} src={logo} alt="Pointing Poker" />;
}
