import { Link } from '@tanstack/react-router';

const people = [
  {
    name: 'Idan Keynan',
    role: 'Member',
    linkedinUrl: 'https://www.linkedin.com/in/idan-keynan/',
    imageUrl:
      'https://static.wixstatic.com/media/b4b807_557372d42094481c974d027bb25ac3aa~mv2.jpg/v1/fill/w_176,h_308,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Profile_Idan_edited.jpg',
  },
  {
    name: 'Dror Pezo',
    role: 'Member',
    linkedinUrl: 'https://www.linkedin.com/in/dror-pezo-b82b31138/',
    imageUrl:
      'https://static.wixstatic.com/media/b4b807_e40784235e984d3bb3185b98c2e49997~mv2.png/v1/crop/x_20,y_3,w_220,h_384/fill/w_176,h_308,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D7%AA%D7%9E%D7%95%D7%A0%D7%941_png-3.png',
  },
  {
    name: 'Roy Ben Avraham',
    role: 'Member',
    linkedinUrl: 'https://www.linkedin.com/in/roybenavraham/',
    imageUrl:
      'https://static.wixstatic.com/media/b4b807_5bfd32468b8a4c4b846ba81dcd68cdde~mv2.png/v1/crop/x_127,y_25,w_177,h_312/fill/w_176,h_308,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Capture_PNG.png',
  },
  {
    name: 'Amit Mizrahi',
    role: 'Member',
    linkedinUrl: 'https://www.linkedin.com/in/amizrahiz/',
    imageUrl:
      'https://static.wixstatic.com/media/b4b807_fc0bea19b20945978dcc293f7daa3383~mv2.jpg/v1/fill/w_176,h_308,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Profile_Amit_edited.jpg',
  },
  {
    name: 'Paz Shakroka',
    role: 'Member',
    linkedinUrl: 'https://www.linkedin.com/in/paz-shakroka-216283224/',
    imageUrl:
      'https://static.wixstatic.com/media/b4b807_d6c79769b0254de6917951ae839c370a~mv2.jpg/v1/fill/w_176,h_308,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D7%AA%D7%9E%D7%95%D7%A0%D7%941_edited_edited_edited.jpg',
  },
];
export const MeetTheTeam = () => {
  return (
    <div className="bg-white p-12 py-14 rounded-3xl w-full">
      <div className="mx-auto grid max-w-5/6 gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg/8 text-gray-700">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <Link
                className="flex items-center gap-x-6 hover:bg-gray-100 cursor-pointer p-1 rounded-sm"
                to={person.linkedinUrl}
                href={person.linkedinUrl}
                target="_blank"
              >
                <img
                  alt=""
                  src={person.imageUrl}
                  className="size-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm/6 font-semibold text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
