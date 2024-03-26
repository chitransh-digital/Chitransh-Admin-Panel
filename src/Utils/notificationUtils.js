export const buildNotificationPayload = (type, data) => {
  if (type === "JOB") {
    const { jobTitle, businessName, jobDescription, salary } = data;
    const notificationTitle = "Chitransh Jobs Alert";
    const notificationBody = `Hiring "${jobTitle}" at "${businessName}" with salary of Rs. ${salary}.\n\n${jobDescription}`;
    return {
      title: notificationTitle,
      body: notificationBody,
      itemId: data.id,
    };
  }
};

export const convertHoursToFormat = (hours) => {
  let totalMinutes = hours * 60;
  let hoursPart = Math.floor(totalMinutes / 60);
  let minutesPart = Math.floor(totalMinutes % 60);
  let hoursString = hoursPart.toString().padStart(2, '0');
  let minutesString = minutesPart.toString().padStart(2, '0');
  let formattedTime = hoursString + " Hours " + minutesString + " minutes";
  return formattedTime;
}
