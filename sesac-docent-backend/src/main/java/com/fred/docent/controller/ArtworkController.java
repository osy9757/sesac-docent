package com.fred.docent.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fred.docent.domain.ArtDTO;
import com.fred.docent.domain.AuthorDTO;
import com.fred.docent.domain.ExhibitionDTO;
import com.fred.docent.domain.GalleryDTO;
import com.fred.docent.service.ArtworkService;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/search")
@Log4j
public class ArtworkController {

    private final ArtworkService artworkService;

    @Autowired
    public ArtworkController(ArtworkService artworkService) {
        this.artworkService = artworkService;
    }

    @GetMapping(value = "/work/{work_Id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArtDTO> getArtwork(
            @PathVariable Long work_Id) {

        log.info("Work: " + work_Id);
        ArtDTO artwork = artworkService.getArtwork(work_Id);
        if (artwork != null) {
            return new ResponseEntity<>(artwork, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(value = "/author/{author_Id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthorDTO> getAuthor (@PathVariable Long author_Id) {
    	log.info(author_Id);
    	AuthorDTO author = artworkService.getAuthor(author_Id);
    	
    	if(author != null) {
    		return new ResponseEntity<>(author, HttpStatus.OK);
    	} else {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    }
    
    @GetMapping(value = "/exhibition/{exhibition_Id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ExhibitionDTO> getExhibition (@PathVariable Long exhibition_Id) {
    	log.info(exhibition_Id);
    	ExhibitionDTO exhibition = artworkService.getExhibition(exhibition_Id);
    	
    	if(exhibition != null) {
    		return new ResponseEntity<>(exhibition, HttpStatus.OK);
    	} else {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    }
    
    @GetMapping(value = "/gallery/{gallery_Id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<GalleryDTO> getGallery (@PathVariable Long gallery_ID) {
    	log.info(gallery_ID);
    	GalleryDTO gallery = artworkService.getGallery(gallery_ID);
    	
    	if(gallery != null) {
    		return new ResponseEntity<>(gallery, HttpStatus.OK);
    	} else {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    }
		
}
