import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center">
      <header className="w-full py-5 text-white flex justify-between items-center px-10 bg-black">
        <div className="ml-auto absolute top-0 right-0 mr-10 mt-5">
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-25">
            Button 1
          </button>
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-2 w-25">
            Button 2
          </button>
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-2 w-25">
            Button 3
          </button>
        </div>
      </header>
      <div className="p-10 shadow-lg rounded-lg max-w-screen-lg mx-auto text-center">
        <div className="flex flex-col gap-0 items-center font-dosis">
          <h1 className="text-8xl font-thin text-text tracking-wide">Nikita Carelov</h1>
          <p className="text-2xl text-text opacity-50 font-thin italic">Mechanical Engineer | 3D Artist | Developer</p>
          <div className="mt-20 flex gap-10">
            <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded text-lg w-32">
              Robotics
            </button>
            <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded text-lg w-32">
              Software
            </button>
            <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded text-lg w-32">
              3D Art
            </button>
            <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded text-lg w-32">
              AI
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
