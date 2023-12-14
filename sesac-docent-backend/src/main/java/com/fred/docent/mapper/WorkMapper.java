package com.fred.docent.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fred.docent.domain.ArtDTO;

@Mapper
public interface WorkMapper {
	
	public int insertWork(ArtDTO workDTO);
	public List<ArtDTO> list(ArtDTO workDTO);
	public int update(ArtDTO workDTO);
	public void invalidate(String work_title);

}
