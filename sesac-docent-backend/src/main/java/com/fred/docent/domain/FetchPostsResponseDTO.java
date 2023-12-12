package com.fred.docent.domain;

import java.util.Date;

import lombok.Data;

@Data
public class FetchPostsResponseDTO {
	private Integer v_post_rank;
	private Long v_post_id;
	private String v_post_title;
	private Integer v_post_views;
	private Date v_post_updated_at;
	private Long v_user_id;
	private String v_user_name;
	private Integer v_post_likes;
	private Long v_last_page;
}
