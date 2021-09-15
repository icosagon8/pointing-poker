import './Title.scss';

interface Ititle {
  title: string;
}

export const Title = (props: Ititle): JSX.Element => {
  const { title } = props;
  return <h2 className="title">{title}</h2>;
};
