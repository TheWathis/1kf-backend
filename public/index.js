let languages = [];

fetch('https://api.example.com/languages')
    .then(response => response.json())
    .then(data => {
        // Store the list of languages in the variable
        languages = data;
        console.log(languages);

        // Dynamically create input fields
        languages.forEach(language => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = language;
            document.body.appendChild(input);
        });

        // Add an empty input field
        const emptyInput = document.createElement('input');
        emptyInput.type = 'text';
        document.body.appendChild(emptyInput);

        // Check if there are two empty input fields
        const inputFields = document.querySelectorAll('input[type="text"]');
        if (inputFields.length === 2 && inputFields[0].value === '' && inputFields[1].value === '') {
            inputFields[0].remove();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });