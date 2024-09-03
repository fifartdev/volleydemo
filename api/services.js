import axios from "axios";

const fetchPosts = async ({ perPage, category, offset, author }) => {
  const postUrl = `https://volleyland.gr/wp-json/wp/v2/posts`;
  try {
    const res = await axios.get(postUrl, {
      params: {
        per_page: perPage,
        categories: category,
        offset: offset,
        author: author,
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error on fetchings", error.message);
  }
};

const fetchMustReadPosts = async ({ perPage, offset, mustRead, readAlso }) => {
  const postUrl = `https://volleyland.gr/wp-json/wp/v2/posts`;

  try {
    const res = await axios.get(postUrl, {
      params: {
        per_page: perPage,
        offset: offset,
      },
    });
    // Filter posts based on custom fields if required
    const filteredPosts = res.data.filter((post) => {
      const acf = post.acf;
      return (
        (!mustRead || acf.must_read === mustRead) &&
        (!readAlso || acf.read_also === readAlso)
      );
    });

    return filteredPosts;
  } catch (error) {
    console.log("Error on fetchings", error.message);
  }
};

const fetchPost = async (id) => {
  const postUrl = `https://volleyland.gr/wp-json/wp/v2/posts/${id}`;

  try {
    const res = await axios.get(postUrl);
    return res.data;
  } catch (error) {
    console.log("Error on fetchings", error.message);
  }
};

const fetchCategories = async () => {
  const categoriesUrl = `https://volleyland.gr/wp-json/volleyapp/v1/categories`;
  try {
    const res = axios.get(categoriesUrl);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const stripHtmlAndDecode = (str) => {
  return decode(str.replace(/(<([^>]+)>)/gi, ""));
};

const fetchNotificationsList = async () => {
  const notUrl = `https://onesignal.com/api/v1/notifications?app_id=aa2ad145-0417-4a65-92a3-e2d0c6eacbc6&platform=1limit=25`;
  try {
    const response = await axios.get(notUrl, {
      headers: {
        Authorization: `Basic MGY1ZjIwYjEtMjBkMS00MDMyLWJkMTMtZGM0MDBiM2E5Nzkx`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error Fetching Notifications", error);
  }
};

export {
  fetchPosts,
  stripHtmlAndDecode,
  fetchPost,
  fetchMustReadPosts,
  fetchCategories,
  fetchNotificationsList,
};
