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

import com.fred.docent.domain.FetchPostDetailsRequestDTO;
import com.fred.docent.domain.FetchPostDetailsResponseDTO;
import com.fred.docent.domain.FetchPostsRequestDTO;
import com.fred.docent.domain.FetchPostsResponseDTO;
import com.fred.docent.domain.InsertPostDTO;
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

    @GetMapping(value = "/list/{category}/{pageSize}/{pageNumber}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FetchPostsResponseDTO>> fetchPosts(
            @PathVariable("category") int category,
            @PathVariable("pageSize") int pageSize,
            @PathVariable("pageNumber") int pageNumber,
            @RequestParam(value = "searchTitle", required = false) String searchTitle) {

        FetchPostsRequestDTO requestDTO = new FetchPostsRequestDTO(category, pageSize, pageNumber, searchTitle);
        List<FetchPostsResponseDTO> postsResponse = postsService.fetchPosts(requestDTO);
        return new ResponseEntity<>(postsResponse, HttpStatus.OK);
    }

    @GetMapping(value = "/details/{postId}/{category}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FetchPostDetailsResponseDTO> fetchPostDetails(
            @PathVariable("postId") Long postId,
            @PathVariable("category") Integer category) {

        FetchPostDetailsRequestDTO requestDTO = new FetchPostDetailsRequestDTO(postId, category);
        FetchPostDetailsResponseDTO postDetails = postsService.fetchPostDetails(requestDTO);
        if (postDetails != null) {
            return new ResponseEntity<>(postDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
