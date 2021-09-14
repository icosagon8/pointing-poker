import './AddGameCard.scss';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const AddGameCard = (): JSX.Element => {
  return (
    <div className="add-game-card">
      <AddCircleOutlineIcon className="add-game-card__icon" />
    </div>
  );
};
