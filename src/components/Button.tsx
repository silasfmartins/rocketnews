interface ButtonProps {
  children: any;
  className: string;
  onClick: any;
}

export default function Button({children, className, onClick}:ButtonProps) {
  return (
    <>
      <button className={`p-2 rounded-md hover:ring-2 ring-2 focus:outline-none focus:ring-2 focus:ring-[#A8A8A8] focus:ring-offset-2 focus:ring-offset-black ${className}`} onClick={onClick}>
        {children}     
      </button>
    </>
  )
}