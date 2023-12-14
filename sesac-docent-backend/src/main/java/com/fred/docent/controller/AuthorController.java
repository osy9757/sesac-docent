package com.fred.docent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fred.docent.domain.AuthorDTO;
import com.fred.docent.service.AuthorService;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/author")
@Log4j
public class AuthorController {
	
	private final AuthorService service;

	@Autowired
	public AuthorController(AuthorService service) {
		this.service = service;
	}

	@PostMapping(value = "/insert", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> register(@RequestBody AuthorDTO dto) {
		try {
			service.insert(dto);
			return new ResponseEntity<>("Exhibition inserted successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to insert exhibition: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/invalidate")
	public ResponseEntity<Object> remove(@RequestBody AuthorDTO dto) {
		if (dto.getAuthor_name() != null) {
			service.invalidate(dto.getAuthor_name());
			return ResponseEntity.ok().body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

	@PostMapping("/update")
	public ResponseEntity<String> update(@RequestBody AuthorDTO dto) {
		log.info("update request");

		if (dto != null && dto.getAuthor_name() != null) {
			service.update(dto);
			return ResponseEntity.ok().body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

}
