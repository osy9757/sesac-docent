package com.fred.docent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.GalleryDTO;
import com.fred.docent.mapper.GalleryMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class GalleryService {
	private final GalleryMapper mapper;

	@Autowired
	public GalleryService(GalleryMapper mapper) {
		this.mapper = mapper;
	}

	public boolean insert(GalleryDTO dto) {
		log.info("Insert gallery: " + dto);
		boolean flag = mapper.insertGallery(dto) == 1;
		return flag;
	}
	
	public List<GalleryDTO> getList(GalleryDTO dto) {
		log.info("Get list of gallery: " + dto);
		return mapper.list(dto);
	}
	
	public void invalidate(String gallery_name) {
	     mapper.invalidate(gallery_name);
	}
	

}
