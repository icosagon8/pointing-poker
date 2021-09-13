import './AddGameCard.scss';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const AddGameCard = (): JSX.Element => {
  return (
    <div className="add-game-card">
      <AddCircleOutlineIcon style={{ fontSize: 70, color: 'gray' }} />
    </div>
  );
};
