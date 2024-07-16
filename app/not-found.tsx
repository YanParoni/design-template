import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center sm:items-center">
      <div
        className={`bg-auth-bkg flex h-full justify-center items-center  pt-4  rounded-lg sm:h-80 sm:w-[432px]`}
      >
        <div className="flex flex-col items-center justify-start gap-0 sm:gap-2 sm:p-2">
          <img className="w-16 h-6" src="/alt-playboxd.svg" />
          <h1 className="mb-2 text-center text-xl font-bold text-white sm:text-2xl">
            Not Found
          </h1>
          <div className="flex">
            <p className=" text-white sm:text-base">Could not find requested resource</p>
          </div>
          <div className="flex rounded-sm bg-accent-theme text-white py-1 px-3">
            <Link href="/">
            Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
