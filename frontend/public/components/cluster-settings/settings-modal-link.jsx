import React from 'react';
import classNames from 'classnames';

import { LoadingInline } from '../utils';

export const SettingsModalLink = ({onClick, outdated, children}) => {
  if (!children) {
    return <LoadingInline />;
  }

  const outdatedClass = outdated ? 'text-muted' : null;
  return <a onClick={onClick} className={classNames('co-m-modal-link', outdatedClass)}>
    {children}
    {outdated && <span className="co-icon-space-l"><LoadingInline /></span>}
  </a>;
};
SettingsModalLink.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  outdated: React.PropTypes.bool
};
