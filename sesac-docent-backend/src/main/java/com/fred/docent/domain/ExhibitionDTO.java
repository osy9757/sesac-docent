package com.fred.docent.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ExhibitionDTO {

	private Long exhibition_id;
	private Long gallery_id;
	private String exhibition_name;
	private String exhibition_description;
	private Date exhibition_start_date;
	private Date exhibition_end_date;
	private String exhibition_url;
	private String exhibition_base64;
}
