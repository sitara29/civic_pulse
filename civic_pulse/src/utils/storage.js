const COMPLAINTS_KEY = "civicpulse_complaints";

export const getComplaints = () => {
  const complaints =
    localStorage.getItem(COMPLAINTS_KEY);

  return complaints
    ? JSON.parse(complaints)
    : [];
};

export const saveComplaints = (complaints) => {
  localStorage.setItem(
    COMPLAINTS_KEY,
    JSON.stringify(complaints)
  );
};

export const addComplaint = (complaint) => {
  const complaints = getComplaints();

  complaints.push(complaint);

  saveComplaints(complaints);

  return complaint;
};