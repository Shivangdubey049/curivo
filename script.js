document.addEventListener("DOMContentLoaded", function() {
    const options = document.querySelectorAll('.options input[type="radio"]');

    options.forEach(option => {
        option.addEventListener('change', function() {
            const questionId = this.getAttribute('name'); // Get the ID of the question

            // Remove 'selected' class from all labels within the same question
            document.querySelectorAll(`[name="${questionId}"]`).forEach(input => {
                input.parentElement.classList.remove('selected');
            });

            // Add 'selected' class to the label of the checked radio input
            const checkedLabel = this.parentElement;
            checkedLabel.classList.add('selected');
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        let totalPoints = 0;
        let isAlertNeeded = false;
        let isContact988Alert = false;

        // Loop through each question
        for (let i = 1; i <= 10; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                totalPoints += parseInt(selectedOption.value);
                if (i === 9 && (selectedOption.value === "1" || selectedOption.value === "2" || selectedOption.value === "3")) {
                    isContact988Alert = true;
                }
            } else {
                isAlertNeeded = true;
            }
        }

        if (isAlertNeeded) {
            alert('Please select one option from each question.');
            return; // Stop further execution
        }

        if (isContact988Alert) {
            alert("Call or text the 988 Suicide & Crisis Lifeline at 988. The Lifeline provides 24-hour, confidential support to anyone in suicidal crisis or emotional distress. Call 911 in life-threatening situations.");
        }

        // Determine result based on total points
        let result = '';
        let subresult = '';
        if (totalPoints >= 0 && totalPoints <= 5) {
            result = "Minimal Depression";
            subresult = "Based on your responses, you have few or no symptoms of depression. This result is not a diagnosis. A doctor or therapist can help you get a diagnosis and/or treatment.";
        } else if (totalPoints >= 6 && totalPoints <= 10) {
            result = "Mild Depression";
            subresult = "Based on your responses, you may have symptoms of mild depression. This result is not a diagnosis. A doctor or therapist can help you get a diagnosis and/or treatment. \n Call or text the 988 Suicide & Crisis Lifeline at 988. The Lifeline provides 24-hour, confidential support to anyone in suicidal crisis or emotional distress. Call 911 in life-threatening situations.";
        } else if (totalPoints >= 11 && totalPoints <= 15) {
            result = "Moderate Depression";
            subresult = "Based on your responses, you may have symptoms of moderate depression. This result is not a diagnosis. A doctor or therapist can help you get a diagnosis and/or treatment. \n Call or text the 988 Suicide & Crisis Lifeline at 988. The Lifeline provides 24-hour, confidential support to anyone in suicidal crisis or emotional distress. Call 911 in life-threatening situations.";
        } else if (totalPoints >= 16 && totalPoints <= 20) {
            result = "Moderately Severe Depression";
            subresult = "Based on your responses, you may have symptoms of moderately severe depression. This result is not a diagnosis. A doctor or therapist can help you get a diagnosis and/or treatment. \n Call or text the 988 Suicide & Crisis Lifeline at 988. The Lifeline provides 24-hour, confidential support to anyone in suicidal crisis or emotional distress. Call 911 in life-threatening situations.";
        } else if (totalPoints >= 21 && totalPoints <= 30) {
            result = "Severe Depression";
            subresult = "Based on your responses, you may have symptoms of severe depression. This result is not a diagnosis. A doctor or therapist can help you get a diagnosis and/or treatment. \n Call or text the 988 Suicide & Crisis Lifeline at 988. The Lifeline provides 24-hour, confidential support to anyone in suicidal crisis or emotional distress. Call 911 in life-threatening situations.";
        }

        // Redirect to result.html with the results as query parameters
        window.location.href = `result.html?result=${encodeURIComponent(result)}&subresult=${encodeURIComponent(subresult)}`;
    });
});
