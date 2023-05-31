"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
const Navbar = () => {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false);
  const {data: session } = useSession();
  const isUserLoggenIn = !!session?.user;
  const [providers, setProviders] = useState(null);
  const [search, setSearch] = useState(false)
  const searchInputRef = useRef()
  const searchTerm = useRef()
  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);

  const handleKeyDown=(e)=>{
    if (e.key==="Enter") {
      router.push(`/?search=${searchInputRef.current.value}`)
      searchInputRef.current.value=""
    }
  }

  const handleMobileSearch=()=>{
    router.push(`/?search=${searchTerm.current.value}`)
    searchInputRef.current.value=""
  }


  return (
    <nav className="flex  items-center justify-between p-4 custom-bg bg-opacity-20 backdrop-filter backdrop-blur-lg  sticky top-0 z-50">

     <Link href="/"> <div className="blue_gradient font-extrabold lg:text-3xl cursor-pointer transition-all ease-linear text-3xl md:text-2xl  ">
        GpEvents.
      </div> </Link>

      <div className={`flex items-center absolute left-3 ${search?"translate-y-0":"-translate-y-36"} md:hidden bg-[#222222]  rounded-xl w-48 sm:w-[300px] transition-transform ease-linear sm:left-[230px] duration-300 `}>
        <input
          className="w-full text-white bg-transparent p-2 text-sm placeholder:text-xs placeholder:text-[#efefef] Cborder-none outline-none h-10 rounded-md"
          type="text"
          placeholder="Search here for events..."
          ref={searchTerm}
        />
        <button className="mr-2" onClick={handleMobileSearch}>
          🔎
        </button>
        <button className="mr-3 font-medium cursor-pointer text-[#efefef]" onClick={()=>setSearch(false)}>
            X
        </button>
      </div>

      {/* Mobile Navigation  */}
      {isUserLoggenIn ? (
        <div className="relative md:hidden ">
          <Image
            src={session?.user?.image}
            width={40}
            height={40}
            className="cursor-pointer rounded-full"
            alt="Image"
            onClick={() => {
              setShowMenu((prevState) => !prevState);
            }}
          />

          
            <ul className={`md:hidden  absolute ${showMenu ? "translate-y-0":"-translate-y-96"} transition-transform duration-500 ease-in-out gap-2   right-0 rounded-xl  bg-[#222222] text-xs sm:text-base text-[#e3e3e3] p-3 top-11 sm:w-32 w-28 flex flex-col`}>
              <li className="codepen-button">
                <span onClick={()=>{
                  router.push('/addEvent')
                  setShowMenu(false)
                  setSearch(false)
                }}>
                  Add Event
                </span>
              </li>
              <li className="font-semibold cursor-pointer hover:text-[#FF69B4] list-none" onClick={()=>{
                router.push(`/profile/${session?.user?.id}`)
                setShowMenu(false)
              }}>
                Profile
              </li>
              <li className="font-semibold cursor-pointer hover:text-[#FF69B4] list-none" onClick={()=>{
                setSearch(true)
                setShowMenu(false)
              }}>
                Search
              </li>
              <li>
                <button className="Btn w-7 h-7 sm:w-9 sm:h-9 "  onClick={()=>signOut()}>
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                </button>
              </li>
            </ul>
          
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                type="button"
                onClick={() => signIn(provider.id)}
                className="bg-[#222222] px-4 rounded-md py-1 text-[#e3e3e3] lg:hidden"
              >
                Sign In
              </button>
            ))}
        </>
      )}

{/* bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-lg p-8 */}

   {isUserLoggenIn &&  <div className={`hidden ${search?"translate-y-0":"-translate-y-80"} md:flex gap-2 items-center max-w-xl absolute lg:static lg:w-3/4 xl:w-full transition-transform duration-500 ease-linear lg:translate-y-0 bg-[#222222] rounded-xl left-2 lg:transition-none `}>
        <input
          className="w-full p-2 text-sm placeholder:font-semibold border-none outline-none placeholder:text-[#efefef] font-semibold  text-white  h-10 bg-transparent rounded-md"
          type="text"
          placeholder="Search here for amazing events..."
          ref={searchInputRef}
          onKeyDown={handleKeyDown}
        />
          <button className="mr-3 font-medium cursor-pointer text-white lg:hidden" onClick={()=>setSearch(false)}>
            X
        </button>
      </div>}

      

      {isUserLoggenIn? (<ul className=" hidden md:flex items-center font-bold text-[#e3e3e3] cursor-pointer 
      gap-6">
      <Link href={`/profile/${session?.user?.id}`}>
      <li className="hover:text-[#FF69B4]">
        <Image
            src={session?.user?.image}
            width={40}
            height={40}
            alt="Image"
            className="cursor-pointer rounded-full"
          />
        </li>
        </Link> 
        <Link href="/addEvent">
        <li className="codepen-button">
                <span>
                  Add Event
                </span>
              </li>
              </Link>
        <li className="lg:hidden hover:text-[#FF69B4]" onClick={()=>setSearch(prev=>!prev)}>Search</li>
        <li>
          <button className="Btn md:h-10 md:w-10" onClick={()=>signOut()}>
            <div className="sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
          </button>
        </li>
      </ul>) : (
        <>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              type="button"
              onClick={() => signIn(provider.id)}
              className="bg-[#222222] px-4 rounded-md py-1 text-[#e3e3e3] hidden lg:flex "
            >
              Sign In
            </button>
          ))}
      </>
      )}
    </nav>
  );
};

export default Navbar;
