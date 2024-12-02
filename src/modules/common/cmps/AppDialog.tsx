import { ReactNode, useEffect, useState } from 'react';

interface Props {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  isDrawerStyle?: boolean;
  isDivider?: boolean;
  isCloseOnClickOutside?: boolean;
}

export const AppDialog = ({ title, onClose, children, isDrawerStyle, isDivider = true, isCloseOnClickOutside = true }: Props) => {
  const [drawerTransitionClass, setDrawerTransitionClass] = useState(' ');

  useEffect(() => {
    if (!isDrawerStyle) return;
    setDrawerTransitionClass('show-drawer-transition');
  }, []);

  useEffect(() => {
    if (!drawerTransitionClass) {
      setTimeout(onClose, 500);
    }
  }, [drawerTransitionClass]);

  const onDrawerClose = () => {
    if (!drawerTransitionClass) return;
    setDrawerTransitionClass('');
  };

  const noop = () => {};
  return (
    <section
      className={`app-dialog flex center-center ${isDrawerStyle ? 'drawer-style' : ''}`}
      onClick={isCloseOnClickOutside? isDrawerStyle ? onDrawerClose : onClose : noop }
    >
      <div
        className={`app-dialog-content flex column ${drawerTransitionClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`dialog-header flex align-center ${
            title ? 'header-border space-between' : 'justify-end'
          }`}
        >
          {title && <h1>{title}</h1>}
        </div>

        {isDivider && title && <span className="horizontal-line-divider"></span>}

        <div className="main-content">{children}</div>
      </div>
    </section>
  );
};
