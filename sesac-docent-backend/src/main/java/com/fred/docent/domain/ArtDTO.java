package com.fred.docent.domain;

import lombok.Data;

@Data
public class ArtDTO {
	private Long work_id;
	private Long author_id;
	private Long exhibition_id;
	private Long gallery_id;
	private String work_title;
	private String work_description;
	private String work_year;
	private String work_image;
	private String work_base64;
	private String work_size;
}
