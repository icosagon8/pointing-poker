import './EditableTitle.scss';
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useState, useRef, useEffect } from 'react';

interface Props {
  title: string;
  onSave: (newTitle: string) => void;
  editButtonDisplay?: boolean;
}

export const EditableTitle = (props: Props): JSX.Element => {
  const { title, onSave, editButtonDisplay: propsEditButtonDisplay } = props;
  const editButtonDisplay = propsEditButtonDisplay === undefined ? true : propsEditButtonDisplay;
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, [editing]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleConfirm = () => {
    setEditing(false);
    onSave(value);
  };

  const handleCancel = () => {
    setEditing(false);
    setValue(title);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="editable-title">
      {editing ? (
        <>
          <input className="editable-title__field" type="text" value={value} onChange={handleChange} ref={ref} />
          <div className="editable-title__btn-container">
            <IconButton className="editable-title__confirm-btn" size="small" onClick={handleConfirm}>
              <CheckIcon />
            </IconButton>
            <IconButton className="editable-title__cancel-btn" size="small" onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </div>
        </>
      ) : (
        <>
          <h2 className="editable-title__text">{title}</h2>
          {editButtonDisplay && (
            <IconButton onClick={handleEdit} color="inherit" size="small">
              <EditOutlinedIcon />
            </IconButton>
          )}
        </>
      )}
    </div>
  );
};
