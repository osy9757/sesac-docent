package com.fred.docent.domain;

import java.util.Date;
import lombok.Data;

@Data
public class FetchArtCollectionResponseDTO {
    // Gallery
    private Long gallery_id;
    private String gallery_name;
    private String gallery_location;
    private String gallery_number;
    private Integer gallery_valid;
    private String gallery_img;  // 새로 추가된 필드

    // Exhibitions
    private Long exhibition_id;
    private String exhibition_name;
    private String exhibition_description;
    private Date exhibition_start_date;
    private Date exhibition_end_date;
    private Integer exhibition_valid;
    private String exhibition_img;  // 새로 추가된 필드

    // Author
    private Long author_id;
    private String author_name;
    private String author_picture;
    private String author_description;
    private String author_email;
    private String author_instagram;
    private String author_img;  // 새로 추가된 필드

    // Work
    private Long work_id;
    private String work_name;  // 변경된 필드 이름
    private String work_description;
    private String work_year;  // 제작년도
    private String work_size;
    private Integer work_valid;  // 새로 추가된 필드
    private String work_img;  // 새로 추가된 필드
}
