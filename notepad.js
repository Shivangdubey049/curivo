const clearButton = document.getElementById('clear-button');
const notepad = document.getElementById('notepad');

clearButton.addEventListener('click', () => {
  notepad.value = ''; // Clear the content of the notepad
});
