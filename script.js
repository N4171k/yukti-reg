function createMemberForm(index, isLeader) {
    const memberType = isLeader ? 'Team Leader' : `Team Member ${index}`;
    const prefix = isLeader ? 'leader' : `member${index}`;
    
    const memberDiv = document.createElement('div');
    memberDiv.className = 'team-member';
    memberDiv.innerHTML = `
        <div class="member-type">${memberType}</div>
        <div class="form-group">
            <label for="${prefix}Name">Full Name</label>
            <input type="text" id="${prefix}Name" name="${prefix}Name" required>
        </div>

        <div class="form-group">
            <label for="${prefix}Enrollment">Enrollment Number</label>
            <input type="text" id="${prefix}Enrollment" name="${prefix}Enrollment" required>
        </div>

        <div class="form-group">
            <label for="${prefix}Semester">Semester</label>
            <select id="${prefix}Semester" name="${prefix}Semester" required>
                <option value="">Select semester</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
            </select>
        </div>

        <div class="form-group">
            <label for="${prefix}Section">Section</label>
            <input type="text" id="${prefix}Section" name="${prefix}Section" required>
        </div>

        <div class="form-group">
            <label for="${prefix}Phone">Phone Number</label>
            <input type="tel" id="${prefix}Phone" name="${prefix}Phone" required>
        </div>
    `;
    return memberDiv;
}

function updateTeamMembers() {
    const container = document.getElementById('teamMembersContainer');
    const teamSize = parseInt(document.getElementById('teamSize').value);
    container.innerHTML = '';

    if (teamSize) {
        // Add team leader
        container.appendChild(createMemberForm(1, true));

        // Add additional members
        for (let i = 2; i <= teamSize; i++) {
            container.appendChild(createMemberForm(i, false));
        }
    }
}

document.getElementById('teamSize').addEventListener('change', updateTeamMembers);

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loader = document.querySelector('.loader');
    const overlay = document.querySelector('.overlay');
    
    loader.style.display = 'block';
    overlay.style.display = 'block';

    try {
        const formData = new FormData(e.target);
        const response = await fetch(e.target.action, {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        if (response.ok) {
            alert('Registration Successful!');
            e.target.reset();
            document.getElementById('teamMembersContainer').innerHTML = '';
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        alert(error.message || 'Error submitting form');
    } finally {
        loader.style.display = 'none';
        overlay.style.display = 'none';
    }
});