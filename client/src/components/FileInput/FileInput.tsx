import { Button, Typography } from '@material-ui/core';
import { useRef, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import './FileInput.scss';

interface Props {
  setSrc: (img: string) => void;
  control: Control<FieldValues>;
}

export function FileInput({ setSrc, control }: Props): JSX.Element {
  const [fileName, setFileName] = useState<string>('Choose file');
  const uploadInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="file-input">
      <label className="file-input__label" htmlFor="avatar">
        Image:
      </label>
      <div className="file-input__wrapper">
        <div className="file-input__name-wrapper">
          <Typography className="file-input__name" noWrap>
            {fileName}
          </Typography>
        </div>
        <Button
          className="btn btn--small"
          variant="contained"
          onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
        >
          Button
        </Button>
        <Controller
          name="avatar"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              className="file-input__field"
              type="file"
              id="avatar"
              accept="image/*"
              ref={uploadInputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                const { files } = e.target;

                if (files) {
                  const file = files[0];
                  const reader = new FileReader();
                  reader.readAsDataURL(file);

                  reader.onload = () => {
                    const imageBase64 = reader.result;
                    field.onChange(imageBase64);
                    setSrc(imageBase64 as string);
                  };

                  setFileName(file.name);
                  e.target.value = '';
                }
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
