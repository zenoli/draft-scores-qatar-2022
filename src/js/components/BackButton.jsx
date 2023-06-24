import { useNavigate } from "react-router-dom"
import { IoMdArrowBack } from "react-icons/io"

export default function BackButton(props) {
  const navigate = useNavigate()
  return (
    <button
      className="hover:bg-white rounded-full hover:text-slate-800"
      onClick={() => navigate(-1)}
    >
      <IoMdArrowBack />
    </button>
  )
}
