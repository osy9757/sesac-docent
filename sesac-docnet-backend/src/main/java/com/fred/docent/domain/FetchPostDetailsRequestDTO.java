package com.fred.docent.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FetchPostDetailsRequestDTO {
	private Long post_Id;
	private Integer category;
}
