package com.fred.docent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.ArtDTO;
import com.fred.docent.mapper.WorkMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class WorkService {

	private final WorkMapper mapper;

	@Autowired
	public WorkService(WorkMapper mapper) {
		this.mapper = mapper;
	}

	public boolean insert(ArtDTO dto) {
//		log.info("Insert author: " + dto);
		boolean insertFlag = mapper.insertWork(dto) == 1;
		return insertFlag;
	}

	public void invalidate(String work_title) {
		mapper.invalidate(work_title);
	}

	public List<ArtDTO> getList(ArtDTO dto) {
//		log.info("Get list of author: " + dto);
		return mapper.list(dto);
	}

	public boolean update(ArtDTO dto) {
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
