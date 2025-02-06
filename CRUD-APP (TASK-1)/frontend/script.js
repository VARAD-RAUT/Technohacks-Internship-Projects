const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const apiUrl = 'http://localhost:5000/api/items';

// Fetch Items and Display in the List
const fetchItems = async () => {
    const response = await fetch(apiUrl);
    const items = await response.json();
    itemList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}:</strong> ${item.description}`;

        // ✅ Create Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editItem(item);

        // ✅ Create Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = async () => {
            await fetch(`${apiUrl}/${item._id}`, { method: 'DELETE' });
            fetchItems();
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    });
};

// ✅ Handle Adding a New Item
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    });

    fetchItems();
    form.reset();
});

// ✅ Function to Handle Editing an Item
const editItem = async (item) => {
    const newName = prompt('Enter new name:', item.name);
    const newDescription = prompt('Enter new description:', item.description);

    if (newName && newDescription) {
        await fetch(`${apiUrl}/${item._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, description: newDescription })
        });
        fetchItems();  // Refresh list after update
    } else {
        alert('Both fields are required for updating!');
    }
};

// ✅ Initial Fetch Call to Load Items on Page Load
fetchItems();
