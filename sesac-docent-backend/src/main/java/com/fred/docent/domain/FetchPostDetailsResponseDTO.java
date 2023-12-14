package com.fred.docent.domain;

import java.util.Date;
import lombok.Data;

@Data
public class FetchPostDetailsResponseDTO {

    // Common fields for categories 1, 2, and 3
    private Long post_id;
    private String user_name;
    private Integer post_valid;
    private String post_title;
    private String post_content;
    private Date post_created_at;
    private Date post_updated_at;

    // Category 1 specific fields
    private Integer post_views;

    // Category 2 specific fields
    private String exhibition_name;
    private String exhibition_description;
    private Date exhibition_start_date;
    private Date exhibition_end_date;
    private Integer exhibition_valid;
    private String exhibition_url;
    private Integer post_likes;

    // Reply details - Now as direct fields, not a list
    private String reply_user_name;
    private Integer reply_post_valid;
    private String reply_post_title;
    private String reply_post_content;
    private Date reply_post_created_at;
}
