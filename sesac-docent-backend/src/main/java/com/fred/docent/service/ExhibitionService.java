package com.fred.docent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.ExhibitionDTO;
import com.fred.docent.mapper.ExhibitionMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class ExhibitionService {

	private final ExhibitionMapper mapper;

	@Autowired
	public ExhibitionService(ExhibitionMapper mapper) {
		this.mapper = mapper;
	}

	public boolean insert(ExhibitionDTO dto) {
//		log.info("Insert exhibition: " + dto);
		boolean insertFlag = mapper.insertExhibition(dto) == 1;
		return insertFlag;
	}

	public void invalidate(String exhibition_name) {
		mapper.invalidate(exhibition_name);
	}

	public List<ExhibitionDTO> getList(ExhibitionDTO dto) {
//		log.info("Get list of exhibition: " + dto);
		return mapper.list(dto);
	}

	public boolean update(ExhibitionDTO dto) {
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
