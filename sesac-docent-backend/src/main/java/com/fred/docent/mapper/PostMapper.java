package com.fred.docent.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.fred.docent.domain.FetchPostDetailsRequestDTO;
import com.fred.docent.domain.FetchPostDetailsResponseDTO;
import com.fred.docent.domain.FetchPostsRequestDTO;
import com.fred.docent.domain.FetchPostsResponseDTO;
import com.fred.docent.domain.InsertPostDTO;

@Mapper
public interface PostMapper {

	void insertPost(@Param("postDTO") InsertPostDTO postDTO);

	List<FetchPostsResponseDTO> fetchPosts(@Param("requestDTO") FetchPostsRequestDTO requestDTO);

	FetchPostDetailsResponseDTO fetchPostDetails(@Param("requestDTO") FetchPostDetailsRequestDTO requestDTO);
}
