import NoDetailsFound from "../utils/NoDetailsFound";
import { subjectType } from "../../customTypes";
import { useRouter } from "next/router";

function Container({ subjects }: { subjects: subjectType[] }) {
  const router = useRouter();

  return subjects.length === 0 ? (
    <NoDetailsFound />
  ) : (
    <div className="bg-gray-100">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Our Stuff
            </h2>
            <p className="text-xl text-gray-500">
              Want to learn and revise DSA covered!.
            </p>
          </div>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {subjects.map((subject: subjectType) => (
              <li key={subject.subject_id}>
                <button
                  onClick={() => router.push(`/topics/${subject.subject_name}`)}
                >
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <img
                        className="object-cover shadow-lg rounded-lg"
                        src={subject.image_url}
                        alt={subject.subject_name}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{subject.subject_name}</h3>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Container;
