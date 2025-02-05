function createMemberForm(index, isLeader = false) {
    const memberType = isLeader ? 'Team Leader' : `Team Member ${index}`;
    const prefix = isLeader ? 'leader' : `member${index}`;

    return `
        <div class="team-member" id="${prefix}Form">
            <div class="member-type">${memberType}</div>
            <div class="form-group">
                <label for="${prefix}Name">Full Name</label>
                <input type="text" id="${prefix}Name" name="${prefix}Name" required>
            </div>

            <div class="form-group">
                <label for="${prefix}Email">Email</label>
                <input type="email" id="${prefix}Email" name="${prefix}Email" required>
            </div>

            <div class="form-group">
                <label for="${prefix}Enrollment">Enrollment Number</label>
                <input type="text" id="${prefix}Enrollment" name="${prefix}Enrollment" required>
            </div>

            <div class="form-group">
                <label for="${prefix}Semester">Semester</label>
                <select id="${prefix}Semester" name="${prefix}Semester" required>
                    <option value="">Select semester</option>
                    
                    <option value="2">2nd</option>
                    
                    <option value="4">4th</option>
                    
                    <option value="6">6th</option>
                    
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
        </div>
    `;
}

document.getElementById('teamSize').addEventListener('change', function() {
    const teamSize = parseInt(this.value);
    const container = document.getElementById('membersContainer');
    container.innerHTML = ''; // Clear existing forms

    // Add team leader form
    container.innerHTML += createMemberForm(1, true);

    // Add member forms
    for(let i = 2; i <= teamSize; i++) {
        container.innerHTML += createMemberForm(i);
    }
});

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
            document.getElementById('membersContainer').innerHTML = '';
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        alert('Error submitting form. Please try again.');
    } finally {
        loader.style.display = 'none';
        overlay.style.display = 'none';
    }
});
