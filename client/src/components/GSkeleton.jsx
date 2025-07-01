/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

function GSkeleton() {
    const data = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
        46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
        76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100
    ]
    return (
        <div className="flex flex-col justify-center mt-7 mb-10 mx-10 pt-[80px] pl-[50px]">
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

export default GSkeleton