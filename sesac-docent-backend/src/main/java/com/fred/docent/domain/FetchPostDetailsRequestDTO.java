package com.fred.docent.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FetchPostDetailsRequestDTO {
	private Long p_post_id;
	private Integer category;
}
