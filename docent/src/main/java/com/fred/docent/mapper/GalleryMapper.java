package com.fred.docent.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.fred.docent.domain.GalleryDTO;

@Mapper
public interface GalleryMapper {
	void insertGallery(@Param("galleryDTO") GalleryDTO galleryDTO);
	
}
