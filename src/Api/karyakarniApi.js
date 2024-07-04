export const getKaryakarnis = async (page) =>{
    try {
      const response = await fetch(`http://159.89.165.67/api/karyakarni/getKaryakarnis?page=${page}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }});
      const karyakarnis = response.json();
      return karyakarnis;
    } catch (error) {
      throw error;
    }
  }
  
  export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch("http://159.89.165.67/api/image/upload", {
      method: "POST",
      body: formData
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
  
    const data = await response.json();
    return data.file;
  };
  
  
  export const createKaryakarni = async (karyakarniData) => {
    try {
      const payload = {
        ...karyakarniData,
      };
      const karyakarni = await fetch("http://159.89.165.67/api/karyakarni/registerKaryakarni", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      return karyakarni;
    } catch (error) {
      console.error("Error creating karyakarni:", error);
      throw error;
    }
  };

  export const addKaryakarniMember = async (id,memberData) => {
    try {
      const payload = {
        memberData,
      };
      const karyakarniMember = await fetch(`http://159.89.165.67/api/karyakarni/addMember/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      return karyakarniMember;
    } catch (error) {
      console.error("Error adding karyakarni member:", error);
      throw error;
    }
  };
  
  export const updateKaryakarni = async (karyakarniId, newData) => {
    try {
      const payload = {
        ...newData
      };
      const karyakarni = await fetch(`http://159.89.165.67/api/karyakarni/update/${karyakarniId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return karyakarni;
    } catch (error) {
      console.error("Error updating karyakarni:", error);
      throw error;
    }
  };

  export const updateKaryakarniMember = async (id,memberId, newData) => {
    try {
      const payload = {
        newData
      };
      const karyakarniMember = await fetch(`http://159.89.165.67/api/karyakarni/update/${id}/${memberId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return karyakarniMember;
    } catch (error) {
      console.error("Error updating karyakarni:", error);
      throw error;
    }
  };
  
  export const removeKaryakarni = async (id, memberId) => {
    try {
      const karyakarni = await fetch(`http://159.89.165.67/api/karyakarni/delete/${id}/${memberId}`, {
        method: "DELETE",
        credentials: "include",
      });
      return karyakarni;
    } catch (error) {
      console.error("Error removing document and associated images:", error);
      throw error;
    }
  };
  