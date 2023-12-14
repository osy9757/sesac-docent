package com.fred.docent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fred.docent.domain.ArtDTO;
import com.fred.docent.service.WorkService;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/work")
@Log4j
public class WorkController {
	
	private final WorkService service;

	@Autowired
	public WorkController(WorkService service) {
		this.service = service;
	}

	@PostMapping(value = "/insert", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> register(@RequestBody ArtDTO dto) {
		try {
			service.insert(dto);
			return new ResponseEntity<>("Exhibition inserted successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to insert exhibition: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/invalidate")
	public ResponseEntity<Object> remove(@RequestBody ArtDTO dto) {
		if (dto.getWork_title() != null) {
			service.invalidate(dto.getWork_title());
			return ResponseEntity.ok().body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

	@PostMapping("/update")
	public ResponseEntity<String> update(@RequestBody ArtDTO dto) {
		log.info("update request");

		if (dto != null && dto.getWork_title() != null) {
			service.update(dto);
			return ResponseEntity.ok().body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

}
