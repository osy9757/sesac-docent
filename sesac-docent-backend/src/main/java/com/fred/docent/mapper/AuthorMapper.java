package com.fred.docent.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.fred.docent.domain.AuthorDTO;

@Mapper
public interface AuthorMapper {
	
	public int insertAuthor(AuthorDTO authorDTO);
	public List<AuthorDTO> list(AuthorDTO authorDTOO);
	public int update(AuthorDTO authorDTO);
	public void invalidate(String author_name);

}
