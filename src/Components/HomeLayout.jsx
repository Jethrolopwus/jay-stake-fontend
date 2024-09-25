import { Outlet } from "react-router"


const HomeLayout = () => {
  return (
    <div className="flex items-center justify-center px-1 sm-px-0 ">
        <Outlet/>
    </div>
  )
}

export default HomeLayout