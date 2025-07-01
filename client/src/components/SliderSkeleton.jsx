/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

function SliderSkeleton() {
    const data = [
        1, 2, 3, 4, 5, 6
    ]
    return (
        <div className="flex flex-col justify-center mt-7 mb-10 mx-6">
            <div className="flex items-center gap-7 text-4xl mb-8">
                <span className="h-[40px] w-[200px] rounded-md bg-slate-700 animpulse"></span>
                <span className="h-[40px] w-[100px] rounded-md bg-slate-700 animpulse"></span>
            </div>
            <div className="flex justify-start items-center gap-8 relative flex-wrap">
                {
                    data.map((item, index) => {
                        return (
                            <div className="h-[300px] w-[200px] cursor-pointer shadow-lg relative z-0 flex justify-center items-center animpulse" key={index}>
                                <div className="h-full w-full bg-slate-700 rounded-md"></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SliderSkeleton