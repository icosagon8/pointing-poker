import { SettingsForm } from '../SettingsForm/SettingsForm';
import { Title } from '../Title/Title';
import './GameSettings.scss';

export const GameSettings = (): JSX.Element => {
  return (
    <div>
      <Title title="Game settings:" />
      <SettingsForm />
    </div>
  );
};
