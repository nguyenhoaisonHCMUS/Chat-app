import { Modal } from '@/components/shared';
import { Navigate, Outlet } from 'react-router-dom';

function Authlayout() {
    const isLoggedIn = false;

    return (
        <>
            {isLoggedIn ? (
                <Navigate to="/" />
            ) : (
                <div className=" auth_bg min-h-screen">
                    <Modal>
                        <Outlet />
                    </Modal>
                </div>
            )}
        </>
    );
}

export default Authlayout;
