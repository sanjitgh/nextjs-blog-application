import Navlink from "./Navlink";
import Logo from "./Logo";
import getAuthUser from "@/lib/getAuthUser";
import { logout } from "@/actions/auth";

export default async function Header() {
  const authUser = await getAuthUser();

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Logo />
          </div>

          <nav className='flex items-center space-x-8'>
            <Navlink label={"Home"} href={"/"} />
            <Navlink label={"Posts"} href={"/posts"} />
            {authUser ? (
              <>
                <Navlink label={"Dashboard"} href={"/dashboard"} />
                <Navlink label={"Create Blog"} href={"/posts/create"} />
                <form action={logout}>
                  <button className='bg-[#4d6bfe] hover:bg-[#3a5bed] rounded py-1.5 px-4 text-white cursor-pointer'>
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Navlink label={"Login"} href={"/login"} />
                <Navlink label={"Register"} href={"/register"} />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
