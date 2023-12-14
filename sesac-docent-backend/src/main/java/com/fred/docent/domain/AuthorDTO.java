package com.fred.docent.domain;

import lombok.Data;

@Data
public class AuthorDTO {

	private Long author_id;
	private Long exhibition_id;
	private Long gallery_id;
	private String author_name;
	private String author_picture;
	private String author_base64;
	private String author_description;
	private String author_email;
	private String author_instagram;
}
