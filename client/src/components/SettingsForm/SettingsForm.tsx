import { useState } from 'react';
import { AddGameCard } from '../AddGameCard/AddGameCard';
import { IOSSwitch } from '../IOSSwitch/IOSSwitch';
import { Timer } from '../Timer/Timer';
import { Title } from '../Title/Title';
import './SettingsForm.scss';

export const SettingsForm = (): JSX.Element => {
  const [state, setState] = useState({
    masterAsPlayer: true,
    changingCard: true,
    timerIsNeeded: true,
    scoreType: '',
    scoreTypeShort: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <form className="settings-form">
        <div className="settings-form__block">
          <label htmlFor="isPlayer" className="settings-form__label">
            Scram master as player:
          </label>
          <IOSSwitch id="isPlayer" checked={state.masterAsPlayer} onChange={handleChange} name="checkedB" />
        </div>
        <div className="settings-form__block">
          <label htmlFor="isChanging" className="settings-form__label">
            Changing card in round end:
          </label>
          <IOSSwitch id="isChanging" checked={state.changingCard} onChange={handleChange} name="checkedB" />
        </div>
        <div className="settings-form__block">
          <label htmlFor="timerIsNeeded" className="settings-form__label">
            Is timer needed:
          </label>
          <IOSSwitch id="timerIsNeeded" checked={state.timerIsNeeded} onChange={handleChange} name="checkedB" />
        </div>
        <div className="settings-form__block">
          <label htmlFor="scoreType" className="settings-form__label">
            Score type:
          </label>
          <input id="scoreType" className="settings-form__input" value={state.scoreType} />
        </div>
        <div className="settings-form__block">
          <label htmlFor="shortType" className="settings-form__label">
            Score type(Short):
          </label>
          <input id="shortType" className="settings-form__input" value={state.scoreTypeShort} />
        </div>
        <div className="settings-form__block">
          <Title title="Round time:" />
          <Timer start={false} />
        </div>
        <div className="settings-form__block-add-card">
          <Title title="Add card values:" />
          <div>
            <AddGameCard />
          </div>
        </div>
      </form>
    </div>
  );
};
