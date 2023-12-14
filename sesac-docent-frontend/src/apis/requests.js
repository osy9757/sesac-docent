import api from "./api";

export const fetchGalleries = async (postData) => {
  try {
    const response = await api.post("/users/sign-up", postData);
    if (response.data.state === 200) {
      return response;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const searchPosts = async (
  category,
  pageSize,
  pageNumber,
  searchCriteria
) => {
  try {
    const URI = `/posts/list/${category}/${pageSize}/${pageNumber}?p_search_title=${searchCriteria}`;
    const response = await api.get(URI);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePosts = async (postIds) => {
  try {
    const URI = `/posts/delete`;
    const response = await api.post(URI, { post_ids: postIds });
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const add = async (type, body) => {
  try {
    const URI = `/${type}/insert`;
    console.log(URI);
    console.log(body);
    const response = await api.post(URI, body);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 갤러리: gallery_name, gallery_location, gallery_number
// 전시: gallery_id, exhibition_name, exhibition_description,
// 작가: exhibition_id, gallery_id, author_name, author_picture, author_description, author_email, author_instagram
// 작품: author_id, exhibition_id, gallery_id, work_title, work_description, work_year, work_image, work_size
