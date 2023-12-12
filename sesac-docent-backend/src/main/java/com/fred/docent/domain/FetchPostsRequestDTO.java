package com.fred.docent.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FetchPostsRequestDTO {
	private Integer p_category;
	private Integer p_page_size;
	private Integer p_page_number;
	private String p_search_title;
	private String p_post_status;
}
