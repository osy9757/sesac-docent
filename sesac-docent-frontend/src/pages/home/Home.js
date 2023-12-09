import HomeImage from "assets/home_fred_tokyo.jpeg";

import { HomeCardBox } from "./components/HomeCardBox";

const Home = () => {
  return (
    <div className="w-full">
      <div className="w-full h-fit aspect-video">
        <img
          src={HomeImage}
          alt="Soleil-d'Or-room-in-the-exhibition"
          className="w-full object-cover"
        />
      </div>
      <div className="w-full xl:h-32 lg:h-28 md:h-24 h-20 flex items-center bg-stone-900">
        <p className="xl:text-[5rem] lg:text-[4rem] md:text-[3.5rem] text-[2.5rem] font-bold ml-16 text-stone-200">
          Designed by Fred Samuel
        </p>
      </div>
      <div className="w-full h-12 flex items-center bg-stone-300">
        <p className="xl:text-[2rem] lg:text-[1.75rem] md:text-[1.5rem] text-[1.5rem] font-bold ml-16 text-stone-700">
          하이 주얼리 크리에이터 프레드 전시
        </p>
      </div>
      <section className="flex flex-col justify-center max-w-[1300px] mx-auto gap-8 mt-24 mb-36">
        <HomeCardBox category="galleries" />
        <HomeCardBox category="exhibitions" />
        <HomeCardBox category="works" />
        <HomeCardBox category="reviews" />
      </section>
    </div>
  );
};

export default Home;
