/* eslint-disable react/prop-types */
import { lazy, Suspense, useEffect, useState } from 'react';
const AdvSearchRes = lazy(() => import('../components/AdvSearchRes'));
import { useParams } from 'react-router-dom';

function AdvSearch() {

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
                        <AdvSearchRes key={que} query={que}/>
                    </Suspense>
                }
            </section>
        </div>
    )
}

export default AdvSearch