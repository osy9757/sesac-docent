package com.fred.docent.domain;

import java.util.List;

import lombok.Data;

@Data
public class DeletePostsDTO {
	private List<Long> post_ids;
}
