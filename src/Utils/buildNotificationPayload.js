export const buildNotificationPayload = (type, data) => {
  if (type === "JOB") {
    const { jobTitle, businessName, jobDescription, salary } = data;
    const notificationTitle = "Chitransh Jobs Alert";
    const notificationBody = `Hiring "${jobTitle}" at "${businessName}" with salary of Rs. ${salary}.\n\n${jobDescription}`;
    return {
      title: notificationTitle,
      body: notificationBody,
    };
  }
};
