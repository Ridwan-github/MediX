import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200">
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <Image
          src="/logo.jpg"
          alt="MediX Logo"
          width={90}
          height={90}
          className="rounded-xl mb-6 shadow-md"
          priority
        />
        <h1 className="text-4xl font-extrabold text-green-700 mb-2 text-center drop-shadow">
          Welcome to <span className="text-green-900">MediX</span>
        </h1>
        <h2 className="text-lg text-gray-700 mb-8 text-center">
          Your smart hospital management solution.<br />
          <span className="text-green-600 font-semibold">Sign in to begin your journey.</span>
        </h2>
        <form className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-black"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition text-black"
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
      <footer className="mt-10 text-gray-500 text-xs text-center">
        &copy; {new Date().getFullYear()} MediX &mdash; SPL Team 5
      </footer>
    </div>
  );
}