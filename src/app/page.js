import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="p-10 shadow-lg rounded-lg max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-0 items-center font-dosis">
          <h1 className="text-8xl font-thin text-text tracking-wide">Nikita Carelov</h1>
          <p className="text-2xl text-text opacity-50 font-thin italic"> Mechanical Engineer | 3D Artist | Developer</p>
        </div>
      </div>
    </main>
  );
}
