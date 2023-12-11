package com.fred.docent.domain;

import java.util.Date;

import lombok.Data;

@Data
public class FetchPostDetailsResponseDTO {

	// category 1
    private Long postId;
    private String userName;
    private Integer postValid;
    private String postTitle;
    private String postContent;
    private Integer postViews;
    private Date postCreatedAt;
    private Date postUpdatedAt;

    // category 2
    private String exhibitionName;
    private String exhibitionDescription;
    private Date exhibitionStartDate;
    private Date exhibitionEndDate;
    private Integer exhibitionValid;
    private String exhibitionUrl;
    private Integer postLikes;

    // category 3
    private String replyUserName;
    private Integer replyPostValid;
    private String replyPostTitle;
    private String replyPostContent;
    private Date replyPostCreatedAt;
}
