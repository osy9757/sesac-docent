package com.fred.docent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.AuthorDTO;
import com.fred.docent.mapper.AuthorMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class AuthorService {
	
	private final AuthorMapper mapper;

	@Autowired
	public AuthorService(AuthorMapper mapper) {
		this.mapper = mapper;
	}

	public boolean insert(AuthorDTO dto) {
		log.info("Insert author: " + dto);
		boolean insertFlag = mapper.insertAuthor(dto) == 1;
		return insertFlag;
	}
	
	public void invalidate(String author_name) {
	     mapper.invalidate(author_name);
	}
	
	public List<AuthorDTO> getList(AuthorDTO dto) {
		log.info("Get list of author: " + dto);
		return mapper.list(dto);
	}
	
	public boolean update(AuthorDTO dto) {
	    try {
	        int result = mapper.update(dto);
	        log.info("Update result: " + result);
	        return result == 1;
	    } catch (Exception e) {
	        log.error("Update failed: " + e.getMessage());
	        return false;
	    }
	}

}
