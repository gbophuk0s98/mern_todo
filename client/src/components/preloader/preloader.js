import React from 'react'

export const Preloader = () => {
    return(
        <div>
            <div style={{height: 500 + 'px'}} className="container w-50 mh-100">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div style={{ height: 50 + 'px', width: 50 + 'px' }} className="spinner-border text-primary" role="status">
                        <span className="sr-only">Загрузка...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}