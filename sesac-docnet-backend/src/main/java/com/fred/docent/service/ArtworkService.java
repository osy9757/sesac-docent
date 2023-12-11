package com.fred.docent.service;

import com.fred.docent.domain.ArtDTO;
import com.fred.docent.domain.AuthorDTO;
import com.fred.docent.domain.ExhibitionDTO;
import com.fred.docent.domain.GalleryDTO;

public interface ArtworkService {
	
    ArtDTO getArtwork(Long work_Id);
    AuthorDTO getAuthor(Long author_Id);
    ExhibitionDTO getExhibition(Long exhibition_Id);
    GalleryDTO getGallery(Long gallery_Id); 
}
