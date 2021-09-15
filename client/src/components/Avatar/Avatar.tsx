import './Avatar.scss';

interface Props {
  src: string;
  name: string;
  surname: string;
}

export function Avatar({ src, name, surname }: Props): JSX.Element | null {
  if (src) {
    return <img src={src} alt="avatar" className="avatar" />;
  }

  if (name) {
    return (
      <div className="avatar avatar--initials">
        <span>
          {name[0]}
          {name && !surname && name[name.length - 1]}
          {name && surname && surname[0]}
        </span>
      </div>
    );
  }

  return null;
}
