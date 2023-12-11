package com.fred.docent.domain;

import lombok.Data;

@Data
public class InsertPostDTO {
	private Long user_Id;
	private Long exhibition_Id;
	private Integer category;
	private String title;
	private String content;
	private Long reply_Id;
	
}
