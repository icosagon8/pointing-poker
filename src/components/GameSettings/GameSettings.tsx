import { SettingsForm } from '../SettingsForm/SettingsForm';
import { Title } from '../Title/Title';

export const GameSettings = (): JSX.Element => {
  return (
    <>
      <Title title="Game settings:" />
      <SettingsForm />
    </>
  );
};
