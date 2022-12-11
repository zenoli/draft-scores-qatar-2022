export default function Header({ icon, title }) {
  return (
    <div className="bg-slate-800 uppercase text-white text-lg p-4 flex gap-4">
      <div className="w-8 h-8 flex justify-center items-center">
        {icon}
      </div>
      {title}
    </div>
  )
}
