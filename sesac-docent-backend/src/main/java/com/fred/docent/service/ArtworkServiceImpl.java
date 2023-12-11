package com.fred.docent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.ArtDTO;
import com.fred.docent.domain.AuthorDTO;
import com.fred.docent.domain.ExhibitionDTO;
import com.fred.docent.domain.GalleryDTO;
import com.fred.docent.mapper.ArtsearchMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class ArtworkServiceImpl implements ArtworkService {

    private final ArtsearchMapper mapper;

    @Autowired
    public ArtworkServiceImpl(ArtsearchMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public ArtDTO getArtwork(Long work_Id) {
        log.info("workId=" + work_Id);
        return mapper.findArtwork(work_Id);
    }

	@Override
	public AuthorDTO getAuthor(Long author_Id) {
        log.info("author_Id=" + author_Id);
        return mapper.findAuthor(author_Id);
	}

	@Override
	public ExhibitionDTO getExhibition(Long exhibition_Id) {
        log.info("exhibition_Id=" + exhibition_Id);
        return mapper.findExhibition(exhibition_Id);
	}

	@Override
	public GalleryDTO getGallery(Long gallery_Id) {
        log.info("gallery_Id=" + gallery_Id);
        return mapper.findGallery(gallery_Id);
	}
}
