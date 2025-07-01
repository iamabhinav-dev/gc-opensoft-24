import { useNavigate } from "react-router-dom"

function Logo() {
  const navigate = useNavigate()
  return (
    <div onClick={()=>{
      navigate("/", {replace: true})
    }} className="cursor-pointer hover:opacity-75 duration-200 min-w-max text-2xl font-bold">movix <span className="text-sky-500">prime</span></div>
  )
}

export default Logo