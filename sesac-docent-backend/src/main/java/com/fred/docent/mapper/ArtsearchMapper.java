package com.fred.docent.mapper;

import org.apache.ibatis.annotations.Param;

import com.fred.docent.domain.ArtDTO;
import com.fred.docent.domain.AuthorDTO;
import com.fred.docent.domain.ExhibitionDTO;
import com.fred.docent.domain.GalleryDTO;

public interface ArtsearchMapper {
	
    ArtDTO findArtwork(@Param("work_Id") Long work_Id);
    AuthorDTO findAuthor(@Param("author_Id") Long author_Id);
    ExhibitionDTO findExhibition(@Param("exhibition_Id") Long exhibition_Id );
    GalleryDTO findGallery(@Param("gallery_Id") Long gallery_Id);
}
