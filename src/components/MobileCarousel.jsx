import classes from './MobileCarousel.module.css';

function MobileCarousel({children}) {
    return (
        <div className={classes.scrollableContainer}>
            <div className='d-inline-flex'>
                {children}
            </div>
        </div>
    );
}

export default MobileCarousel;