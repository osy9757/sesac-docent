package com.fred.docent.domain;

import java.util.Date;

import lombok.Data;

@Data
public class FetchArtCollectionResponseDTO {
	//Gallery
	private Long gallery_id;
	private String gallery_name;
	private String gallery_location;
	private String gallery_number;
	private String gallery_url;
	private Integer gallary_valid;
	
	//Exhibitions
	private Long exhibition_id;
	private String exhibition_name;
	private String exhibition_description;
	private Date exhibition_start_date;
	private Date exhibition_end_date;
	private Integer exhibiiton_valid;
	private String exhibition_url;

	//Author
	private Long author_id;
	private String author_name;
	private String author_picture;
	private String author_description;
	private String author_email;
	private String author_instagram;
	
	//Work
	private Long work_id;
	private String work_title;
	private String work_description;
	private String work_year; //제작년도
	private String work_image;
	private String work_size;
	
}
