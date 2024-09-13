import 'bootstrap/dist/css/bootstrap.min.css';

function AccessDeniedPage() {
    return (
        <>
            <h1 className='text-danger'>Odmowa dostępu</h1>
            <p className='text-danger'>
                Wygląda na to, że nie masz dostępu do strony, którą próbujesz odwiedzić
            </p>
        </>
    );
}

export default AccessDeniedPage;