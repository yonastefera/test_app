import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

import './SettingsPanel.scss';

export default function SettingsPanel(props) {
  return (
    <div className={'settings-panel-wrapper'}>
      <div className={'settings-panel'}>
        <div className={'settings-panel__label'}>Sort by:</div>

        <Dropdown
          values={props.sortVariants}
          onChange={(value) => {
            props.onChange(value);
          }}
        />
      </div>
    </div>
  );
}
