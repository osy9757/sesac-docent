package com.fred.docent.domain;

import lombok.Data;

@Data
public class ArtDTO {
	private Long work_Id;
	private Long author_Id;
	private Long exhibition_Id;
	private Long gallery_Id;
	private String title;
	private String description;
	private String year;
	private String image_url;
}
