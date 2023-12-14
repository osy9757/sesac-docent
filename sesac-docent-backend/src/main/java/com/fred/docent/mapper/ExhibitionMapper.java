package com.fred.docent.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fred.docent.domain.ExhibitionDTO;

@Mapper
public interface ExhibitionMapper {
	
	public int insertExhibition(ExhibitionDTO exhibitionDTO);
	public List<ExhibitionDTO> list(ExhibitionDTO exhibitionDTO);
	public int update(ExhibitionDTO exhibitionDTO);
	public void invalidate(String exhibition_name);

}
