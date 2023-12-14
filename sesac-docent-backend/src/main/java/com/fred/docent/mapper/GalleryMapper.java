package com.fred.docent.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fred.docent.domain.GalleryDTO;
import com.fred.docent.domain.UserDTO;

@Mapper
public interface GalleryMapper {
	
	public int insertGallery(GalleryDTO galleryDTO);
	public List<GalleryDTO> list(GalleryDTO galleryDTO);
	public int update(GalleryDTO galleryDTO);
	public void invalidate(String gallery_name);

}
