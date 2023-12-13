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
    console.log(URI);
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
    console.log(URI);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
