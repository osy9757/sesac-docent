package com.fred.docent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fred.docent.domain.GalleryDTO;
import com.fred.docent.service.GalleryService;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/gallery")
@Log4j
public class GalleryController {

	private final GalleryService service;

	@Autowired
	public GalleryController(GalleryService service) {
		this.service = service;
	}

	@PostMapping(value = "/insert", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> register(@RequestBody GalleryDTO dto) {
		log.info(dto);
		try {
			service.insert(dto);
			return new ResponseEntity<>("Gallery inserted successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to insert gallery: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/invalidate")
	public ResponseEntity<Object> remove(@RequestBody GalleryDTO dto) {
		if (dto.getGallery_name() != null) {
			service.invalidate(dto.getGallery_name());
			return ResponseEntity.ok().body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

	@PostMapping("/update")
	public ResponseEntity<String> update(@RequestBody GalleryDTO dto) {
		log.info("update request");

		if (dto != null && dto.getGallery_name() != null) {
			service.update(dto);
			return ResponseEntity.ok().body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

}
