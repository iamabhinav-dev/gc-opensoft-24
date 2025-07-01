/* eslint-disable react/prop-types */
import { lazy, Suspense } from 'react';
const Favourites = lazy(() => import('../components/Favourites'));

function AdvSearch() {
    
    return (
        <div className="bg-[#00050D] text-white flex flex-col justify-center items-center h-auto min-h-screen w-screen p-5">
            <section className='w-full'>
                {
                    <Suspense>
                        <Favourites/>
                    </Suspense>
                }
            </section>
        </div>
    )
}

export default AdvSearch