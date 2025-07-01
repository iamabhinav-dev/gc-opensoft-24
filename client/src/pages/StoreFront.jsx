import { lazy, Suspense, useEffect, useState } from 'react'
const SliderGenre = lazy(() => import('../components/SliderGenre'));
import SliderLang from '../components/SliderLang';

function StoreFront() {
    const [genres, setGenres] = useState([]);
    const [lang, setLang] = useState([]);

    useEffect(() => {
        setGenres(["History","Mystery","Horror","Romance","Action","Sport","News","Music","Animation","Fantasy","Western","Biography","Adventure","Family","Musical","Comedy","Sci-Fi","War","Documentary","Short","Thriller","Drama","Crime"].sort());
        setLang(["Hindi", "English"]);
    }, [])

    return (
        <div className="bg-[#00050D] text-white flex flex-col justify-center items-center h-auto w-screen p-5 pt-[80px] pb-[200px]">
            {/* {Carousel compoenent} */}
            <section className='w-full'>
                {
                    lang.map((lang, index) => {
                        return (
                            <SliderLang key={index} lang={lang} />
                        )
                    })
                }
            </section>
            <section className='w-full'>
                {
                    genres.map((genre, index) => {
                        return (
                            <Suspense key={index} >
                                <SliderGenre genre={genre} />
                            </Suspense>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default StoreFront