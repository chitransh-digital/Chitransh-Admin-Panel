export const getFamilies = async () => {
    try {
        const families = await fetch("http://localhost:5000/member/viewFamilies", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return families.json();
    }catch(error){
        throw error;
    }
}

export const addMember = async (memberData) => {
    try {
        const payload = {
            ...memberData,
        };
        const member = await fetch("http://localhost:5000/member/addMember", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return member;
    } catch (error) {
        console.error("Error adding member:", error);
        throw error;
    }
}

export const updateMember = async (familyID, memberData) => {
    try {
      const response = await fetch(`http://localhost:5000/member/update/${familyID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: memberData.name,
          memberData,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Member updated successfully');
      } else {
        alert(`Failed to update member: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  export const deleteMember = async (familyID, name) => {
    try {
      const response = await fetch(`http://localhost:5000/member/delete/${familyID}/${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert('Member deleted successfully');
      } else {
        alert(`Failed to delete member: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };