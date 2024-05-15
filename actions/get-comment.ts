import toast from 'react-hot-toast';

export const getCommentByPostId = async (postId: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/comments/posts/${postId}`,
      {
        cache: 'no-store',
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((err) => console.log(err));
    // if (!res.ok) throw new Error('Failed to fetch data');
    // return res.json();
    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAllComments = async () => {
  try {
    const res = await fetch('/api/comments').then((res) => {
      return res.json().catch((err) => console.log(err));
    });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
