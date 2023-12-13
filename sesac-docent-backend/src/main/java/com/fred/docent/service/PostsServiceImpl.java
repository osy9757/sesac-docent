package com.fred.docent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.DeletePostsDTO;
import com.fred.docent.domain.FetchArtCollectionResponseDTO;
import com.fred.docent.domain.FetchPostDetailsRequestDTO;
import com.fred.docent.domain.FetchPostDetailsResponseDTO;
import com.fred.docent.domain.FetchPostsRequestDTO;
import com.fred.docent.domain.FetchPostsResponseDTO;
import com.fred.docent.domain.InsertPostDTO;
import com.fred.docent.domain.UpdatePostDTO;
import com.fred.docent.mapper.PostMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class PostsServiceImpl implements PostsService {

	private final PostMapper postMapper;

	@Autowired
	public PostsServiceImpl(PostMapper postMapper) {
		this.postMapper = postMapper;
	}

	@Override
	public void insertPost(InsertPostDTO postDTO) {
		log.info("Inserting post: " + postDTO);
		postMapper.insertPost(postDTO);
	}
	
	@Override
	public void updatePost(UpdatePostDTO postDTO) {
		log.info("Updating post: " + postDTO);
		postMapper.updatePost(postDTO);
	}
	
	@Override
	public void deletePost(DeletePostsDTO postDTO) {
		log.info("delete post: " + postDTO);
		postMapper.deletePost(postDTO);
	}

	@Override
	public List<FetchPostsResponseDTO> fetchPosts(FetchPostsRequestDTO requestDTO) {
		log.info("Fetching posts with request: " + requestDTO);
		return postMapper.fetchPosts(requestDTO);
	}

	@Override
	public FetchPostDetailsResponseDTO fetchPostDetails(FetchPostDetailsRequestDTO requestDTO) {
		log.info("Fetching post details for post ID: " + requestDTO.getPost_Id());
		return postMapper.fetchPostDetails(requestDTO);
	}

	@Override
	public List<FetchArtCollectionResponseDTO> fetchArtCollections(FetchPostsRequestDTO requestDTO) {
		log.info("Fetching posts with request: " + requestDTO);
		return postMapper.fetchArtCollections(requestDTO);
	}
}
