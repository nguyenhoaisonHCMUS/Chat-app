import { ReactNode } from 'react';

function Modal({ children }: { children: ReactNode }) {
    return (
        <div className="fixed z-999 top-0 left-0 w-full h-full max-h-screen overflow-auto flex-center">
            <div className=" absolute top-0 left-0 w-full h-full bg-slate-700 opacity-40"></div>
            <div className=" relative">{children}</div>
        </div>
    );
}

export default Modal;
