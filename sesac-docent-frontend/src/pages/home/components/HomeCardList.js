import { HomeCard } from "./HomeCard";

export const HomeCardList = ({ cards, dummyCards }) => {
  return (
    <div className="flex justify-between">
      {dummyCards.map((card, index) => (
        <HomeCard
          key={index}
          src={card.src}
          title={card.title}
          desc={card.desc}
          desc2={card.desc2}
        />
      ))}
    </div>
  );
};
