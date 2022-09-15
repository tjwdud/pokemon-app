import Image from 'next/image';
import Link from 'next/link';
const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Link href={'/'}>
        <img
          src="/assets/img/logo.png"
          className="w-[200px] h-[100px] m-auto cursor-pointer"
          alt="logo"
        />
      </Link>

      <Link href={'/game'} className="bg-red-200">
        <button
          type="button"
          className="text-white bg-gray-800 rounded-full px-5 py-2.5  mb-2 w-[100px] ml-[90%] mt-[-20px]"
        >
          게임하기
        </button>
      </Link>
      {children}
    </div>
  );
};

export default Layout;
