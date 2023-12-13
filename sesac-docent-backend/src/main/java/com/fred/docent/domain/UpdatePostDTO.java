package com.fred.docent.domain;

import java.util.Date;

import lombok.Data;

@Data
public class UpdatePostDTO {
	private Long post_id;
	private String post_title;
	private String post_content;
	private Date post_updated_at;
	private Integer post_valid;
}
