/* eslint-disable react/prop-types */
import { lazy, Suspense, useEffect, useState } from 'react';
const FullGenre = lazy(() => import('../components/Genre'));
import { useParams } from 'react-router-dom';

function Genre() {

    const [gen, setGen] = useState('');
    var { genre } = useParams();
    genre = genre.charAt(0).toUpperCase() + genre.slice(1);

    useEffect(()=>{
        setGen(genre);
    },[genre])
    
    return (
        <div className="bg-[#00050D] text-white flex flex-col justify-center items-center h-auto min-h-screen w-screen p-5">
            <section className='w-full'>
                {
                    <Suspense>
                        <FullGenre key={gen} genre={gen}/>
                    </Suspense>
                }
            </section>
        </div>
    )
}

export default Genre