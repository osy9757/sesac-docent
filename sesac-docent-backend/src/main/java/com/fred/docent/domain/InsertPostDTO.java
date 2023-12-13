package com.fred.docent.domain;

import lombok.Data;

@Data
public class InsertPostDTO {
	private Long p_user_id;
	private Long p_exhibition_id;
	private Integer p_category;
	private String p_title;
	private String p_content;
	private Long p_reply_id;
	
}
