import { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const PortalRenderer = ({ children }: { children: any }) => {
  return ReactDOM.createPortal(children, document.getElementById('portal')!);
};
