package com.fred.docent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fred.docent.domain.DeletePostsDTO;
import com.fred.docent.domain.FetchArtCollectionResponseDTO;
import com.fred.docent.domain.FetchPostDetailsRequestDTO;
import com.fred.docent.domain.FetchPostDetailsResponseDTO;
import com.fred.docent.domain.FetchPostsRequestDTO;
import com.fred.docent.domain.FetchPostsResponseDTO;
import com.fred.docent.domain.InsertPostDTO;
import com.fred.docent.domain.UpdatePostDTO;
import com.fred.docent.service.PostsService;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/posts")
@Log4j
public class PostController {

	private final PostsService postsService;

	@Autowired
	public PostController(PostsService postsService) {
		this.postsService = postsService;
	}

	@PostMapping(value = "/insert", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> insertPost(@RequestBody InsertPostDTO postDTO) {
		postsService.insertPost(postDTO);
		return new ResponseEntity<>("Post inserted successfully", HttpStatus.OK);
	}

	@PostMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> updatePost(@RequestBody UpdatePostDTO postDTO) {
		postsService.updatePost(postDTO);
		return new ResponseEntity<>("Post updated successfully", HttpStatus.OK);
	}

	@PostMapping(value = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deletePost(@RequestBody DeletePostsDTO postDTO) {
		postsService.deletePost(postDTO);
		return new ResponseEntity<>("Post delete successfully", HttpStatus.OK);
	}

	@GetMapping(value = "/list/{p_category}/{p_page_size}/{p_page_number}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<FetchPostsResponseDTO>> fetchPosts(@PathVariable("p_category") int category,
			@PathVariable("p_page_size") int pageSize, @PathVariable("p_page_number") int pageNumber,
			@RequestParam(value = "p_search_title", required = false) String searchTitle,
			@RequestParam(value = "p_post_status", required = false) String postStatus) {

		FetchPostsRequestDTO requestDTO = FetchPostsRequestDTO.builder().p_category(category).p_page_size(pageSize)
				.p_page_number(pageNumber).p_search_title(searchTitle).p_post_status(postStatus).build();
//        = new FetchPostsRequestDTO.builder()(category, pageSize, pageNumber, searchTitle, postStatus);
		List<FetchPostsResponseDTO> postsResponse = postsService.fetchPosts(requestDTO);
		return new ResponseEntity<>(postsResponse, HttpStatus.OK);
	}

	@GetMapping(value = "/details/{postId}/{category}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<FetchPostDetailsResponseDTO> fetchPostDetails(@PathVariable("postId") Long postId,
			@PathVariable("category") Integer category) {

		FetchPostDetailsRequestDTO requestDTO = new FetchPostDetailsRequestDTO(postId, category);
		FetchPostDetailsResponseDTO postDetails = postsService.fetchPostDetails(requestDTO);
		if (postDetails != null) {
			return new ResponseEntity<>(postDetails, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping(value = "/listup/{p_table_name}/{p_page_size}/{p_page_number}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<FetchArtCollectionResponseDTO>> fetchArtCollections(
			@PathVariable("p_table_name") String tablename, @PathVariable("p_page_size") int pageSize,
			@PathVariable("p_page_number") int pageNumber) {
		
		FetchPostsRequestDTO requestDTO = FetchPostsRequestDTO.builder().p_table_name(tablename).p_page_size(pageSize)
				.p_page_number(pageNumber).build();
		List<FetchArtCollectionResponseDTO> postsResponse = postsService.fetchArtCollections(requestDTO);
		return new ResponseEntity<>(postsResponse, HttpStatus.OK);

	}

}
