const API_URL = "http://localhost:5000"; // Change this URL if needed

// Fetch all threads
export const getThreads = async () => {
  try {
    const response = await fetch(`${API_URL}/threads`);
    if (!response.ok) {
      throw new Error("Failed to fetch threads");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new thread
export const createThread = async (thread) => {
  try {
    const response = await fetch(`${API_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thread),
    });
    console.log(response.status); // Log status code
    if (!response.ok) {
      throw new Error("Failed to create thread");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch comments for a specific thread
export const getComments = async (threadId) => {
  try {
    const response = await fetch(`${API_URL}/comments/by-threadId/${threadId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new comment
export const createComment = async (comment) => {
  try {
    const response = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      throw new Error("Failed to create comment");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete comment");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a comment
export const updateComment = async (commentId, updatedText) => {
  console.log(commentId, updatedText);
  try {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: updatedText }), // Ensure correct JSON structure
    });

    if (!response.ok) {
      throw new Error("Failed to update comment");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteThread = async (threadId) => {
  try {
    const response = await fetch(`${API_URL}/threads/${threadId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete thread");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateThread = async (threadId, updatedThread) => {
  try {
    const response = await fetch(`${API_URL}/threads/${threadId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedThread),
    });
    if (!response.ok) throw new Error("Failed to update thread");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Like a thread
export const likeThread = async (threadId) => {
  try {
    const response = await fetch(`${API_URL}/threads/${threadId}/like`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to like thread");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getThread = async (threadId) => {
  try {
    const response = await fetch(`${API_URL}/threads/${threadId}`);
    if (!response.ok) throw new Error("Failed to fetch thread");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
