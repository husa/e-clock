import './Dock.scss';

import classNames from 'classnames';
import { dock } from '../../config';
import DockIcon from './DockIcon';
import { useDockSettingsSlice } from '../../store/slices/dockSlice';
import { useSettingsSlice } from '../../store/slices/settingsSlice';

type Props = {
  className?: string;
  onSettingsClick: () => void;
};

const Dock = ({ className, onSettingsClick }: Props) => {
  const { state: dockSettings } = useDockSettingsSlice();
  const { state: settings } = useSettingsSlice();
  const autoHide = settings.autoHideDock;

  const dockClassName = classNames('dock', className, {
    'dock--autohide': autoHide,
  });

  return (
    <div className={dockClassName}>
      {dock
        .filter((d) => dockSettings[d.url] !== false)
        .map((dockItem) => (
          <DockIcon
            key={dockItem.url}
            isSettingsIcon={dockItem.url === 'settings'}
            {...dockItem}
            toggleSettings={onSettingsClick}
          />
        ))}
    </div>
  );
};
export default Dock;
