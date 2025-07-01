/* eslint-disable react/prop-types */
import { lazy, Suspense, useEffect, useState } from 'react';
const FullSearch = lazy(() => import('../components/FullSearch'));
import { useParams } from 'react-router-dom';

function Search() {

    const [que, setQue] = useState('');
    var { query } = useParams();

    useEffect(()=>{
        setQue(query);
    },[query])
    
    return (
        <div className="bg-[#00050D] text-white flex flex-col justify-center items-center h-auto min-h-screen w-screen p-5">
            <section className='w-full'>
                {
                    <Suspense>
                        <FullSearch key={que} query={que}/>
                    </Suspense>
                }
            </section>
        </div>
    )
}

export default Search