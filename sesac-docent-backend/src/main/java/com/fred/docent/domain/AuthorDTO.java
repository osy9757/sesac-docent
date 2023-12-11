package com.fred.docent.domain;

import lombok.Data;

@Data
public class AuthorDTO {
	
    private Long author_Id;
    private Long exhibition_Id;
    private Long gallery_Id;
    private String authorName;
    private String author_Url;
}
