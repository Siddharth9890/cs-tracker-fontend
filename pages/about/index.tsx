import sid from "../../public/siddharth.png";
import varan from "../../public/varandeep.jpg";
import shreyas from "../../public/shreyas.png";
import github from "../../public/github.png";
import website from "../../public/website.png";
import Head from "next/head";
import Image from "next/image";

const people = [
  {
    name: "Siddharth Singh",
    role: "Full Stack Developer",
    imageUrl: sid,
    githubUrl: "https://github.com/Siddharth9890",
    personalWebsiteUrl: "https://siddharth9890.pages.dev/",
  },
  {
    name: "Vareendeep Bhalla",
    role: "Full Stack Developer",
    imageUrl: varan,
    githubUrl: "https://github.com/varan5",
    personalWebsiteUrl: "https://varan5.github.io/",
  },
  {
    name: "Shreyas Bansode",
    role: "Full Stack Developer,Android Developer",
    imageUrl: shreyas,
    githubUrl: "https://github.com/hishreyas",
    personalWebsiteUrl: "https://sanedroid.tech/",
  },
];

function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us </title>
      </Head>
      <>
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet Our Team
              </h2>
              <p className="text-xl">
                We are a team of 3 friends trying to build products that help
                the world!
              </p>
            </div>
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <Image
                        className="object-cover shadow-lg rounded-lg"
                        src={person.imageUrl}
                        alt=""
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.name}</h3>
                        <p className="text-indigo-600">{person.role}</p>
                      </div>
                      <ul role="list" className="flex space-x-5">
                        <li>
                          <a
                            href={person.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:text-indigo-700"
                          >
                            <span className="sr-only">Github</span>
                            <Image src={github} alt="Github" />
                          </a>
                        </li>
                        <li>
                          <a
                            href={person.personalWebsiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Personal Website</span>
                            <Image src={website} alt="personal website" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    </>
  );
}
export default AboutUs;
