/* eslint-disable react/prop-types */
import { lazy, Suspense, useEffect, useState } from 'react';
const FullLang = lazy(() => import('../components/Lang'));
import { useParams } from 'react-router-dom';

function Lang() {

    const [language, setLanguage] = useState('');
    var { lang } = useParams();
    lang = lang.charAt(0).toUpperCase() + lang.slice(1);

    useEffect(()=>{
        setLanguage(lang);
    },[lang])
    
    return (
        <div className="bg-[#00050D] text-white flex flex-col justify-center items-center h-auto min-h-screen w-screen p-5">
            <section className='w-full'>
                {
                    <Suspense>
                        <FullLang key={language} language={language}/>
                    </Suspense>
                }
            </section>
        </div>
    )
}

export default Lang