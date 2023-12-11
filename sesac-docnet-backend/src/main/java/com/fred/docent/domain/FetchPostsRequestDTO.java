package com.fred.docent.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FetchPostsRequestDTO {
	private Integer category;
	private Integer page_Size;
	private Integer page_Number;
	private String search_Title;
}
