import React from 'react'
import GarageSaleBanner from '../../components/GarageSaleBanner'
import GarageSaleRecentlyViewed from '../../components/GarageSaleRecentlyViewed'

const GarageSale = () => {
    return (
        <div className='w-full min-h-screen'>
            <GarageSaleBanner />
            {/* Recently Viewed Section */}
            <GarageSaleRecentlyViewed />
        </div>
    )
}

export default GarageSale