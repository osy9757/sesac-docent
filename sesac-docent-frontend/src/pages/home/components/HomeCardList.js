import { HomeCard } from "./HomeCard";

export const HomeCardList = ({ cards, category }) => {

  const propertyMappings = {
    galleries: {
      imgProperty: 'gallery_img',
      titleProperty: 'gallery_name',
      descProperty: 'gallery_location',
    },
    exhibitions: {
      imgProperty: 'exhibition_img',
      titleProperty: 'exhibition_name',
      descProperty: 'exhibition_description',
    },
    authors: {
      imgProperty: 'author_img',
      titleProperty: 'author_name',
      descProperty: 'author_description',
    },
    works: {
      imgProperty: 'work_img',
      titleProperty: 'work_name',
      descProperty: 'work_description',
    },
  }

  const currentMapping = propertyMappings[category];

  return (
    <div className="flex justify-between">     
      {cards.map((card, index) => (
        <HomeCard
          key={index}
          src={card[currentMapping.imgProperty]}
          title={card[currentMapping.titleProperty]}
          desc={card[currentMapping.descProperty]}
        />
      ))}
    </div>
  );
};
