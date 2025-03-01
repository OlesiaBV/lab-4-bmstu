function handleSubmit() {
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const greetingMessage = document.getElementById('greetingMessage');

    if (firstName && lastName) {
        greetingMessage.textContent = `Здравствуйте, ${firstName} ${lastName}!`;
    } else {
        greetingMessage.textContent = ''; // Если поля пустые, не показывать приветствие
    }
}

document.getElementById('submitButton').addEventListener('click', handleSubmit);