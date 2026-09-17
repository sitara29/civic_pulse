export const generateComplaintId = () => {

    const complaints =
      JSON.parse(
        localStorage.getItem("civicpulse_complaints")
      ) || [];
  
    const nextNumber = complaints.length + 1;
  
    const complaintNumber =
      String(nextNumber).padStart(4, "0");
  
    return `CP2026${complaintNumber}`;
  };