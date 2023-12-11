package com.fred.docent.domain;

import java.util.Date;

import lombok.Data;

@Data
public class FetchPostsResponseDTO {
	private Integer post_Rank;
	private Long post_Id;
	private String post_title;
	private Integer post_Views;
	private Date post_Update_At;
	private Long user_Id;
	private String user_Name;
	private Integer post_Likes;
}
