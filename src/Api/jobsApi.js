export const getJobs = async (page) => {
  try {
    const data = await fetch (`http://159.89.165.67/api/job/getAll?page=${page}`, {
      method: "GET",
      credentials: "include",
    });
    const jobs = await data.json();
    return jobs;
  } catch (err) {
    console.error("Error getting jobs:", err);
  }
};

export const createJob = async (jobData) => {
  try {
    const payload = {
      ...jobData,
      requirements: jobData.requirements.split(",").map((item) => item.trim()),
      salary: parseInt(jobData.salary),
    };
    const job = await fetch("http://159.89.165.67/api/job/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    return job;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const updateJob = async (jobId, updatedJobData) => {
  try {
    const payload = {
      ...updatedJobData,
      requirements: updatedJobData.requirements
        .split(",")
        .map((item) => item.trim()),
      salary: parseInt(updatedJobData.salary),
    };
    const job = await fetch(`http://159.89.165.67/api/job/update/${jobId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return job;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const removeJob = async (jobId) => {
  try {
    const job = await fetch(`http://159.89.165.67/api/job/delete/${jobId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return job;
  } catch (error) {
    console.error("Error removing document and associated images:", error);
    throw error;
  }
};