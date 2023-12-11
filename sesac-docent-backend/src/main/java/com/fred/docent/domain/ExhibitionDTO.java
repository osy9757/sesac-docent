package com.fred.docent.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ExhibitionDTO {

	private Long exhibition_Id;
	private Long gallery_Id;
	private String exhibition_Name;
	private Date start_Date;
	private Date end_Date;
	private String exhibition_Url;
	private String exhibition_Location;
}
