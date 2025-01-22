import './SettingsBackgroundImageURL.scss';
import { useState } from 'react';
import lang from '../../../services/lang';
import { TextInput } from '../../UI/TextInput/TextInput';

type Props = {
  value?: string;
  onChange: (url: string) => void;
};
export const SettingsBackgroundImageURL = ({ value = '', onChange }: Props) => {
  const [val, setVal] = useState(value);
  return (
    <div className="settings-backgroundImageURL">
      <TextInput
        placeholder={lang.t('i18nCustomImage')}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button onClick={() => onChange(val)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
          <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
        </svg>
      </button>
    </div>
  );
};
