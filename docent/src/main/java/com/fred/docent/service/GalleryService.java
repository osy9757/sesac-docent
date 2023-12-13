package com.fred.docent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fred.docent.mapper.GalleryMapper;

@Service("GalleryService")
public class GalleryService {
	
	private final GalleryMapper mapper;
	
	@Autowired
	public GalleryService(GalleryMapper mapper) {
		this.mapper = mapper;
	}
	
	

}
