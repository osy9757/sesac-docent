package com.fred.docent.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class GalleryDTO {
	
	private Long gallery_id;
	private String gallery_name;
	private String gallery_location;
	private String gallery_number;
	private String gallary_url;
}
