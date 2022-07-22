import Image from "next/image";
import HeroImage from "../../public/heroImage.avif";

function HeroSection() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <Image
              className="h-full w-full object-cover"
              src={HeroImage}
              alt="People working on laptops"
              layout="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block ">Master your</span>
              <span className="block text-indigo-200">
                Data structures and Algorithms Skills
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
              Plus much more for you cracking your next interview.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
