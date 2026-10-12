const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const answer = document.getElementById("answer");

askButton.addEventListener("click", async () => {

    const question = questionInput.value.trim();

    if (!question) {
        answer.innerText = "Please enter a question.";
        return;
    }

    answer.innerText = "Thinking... ";

    try {

        const response = await fetch("/ask", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        answer.innerText = data.answer;

    } catch (error) {

        console.log(error);

        answer.innerText =
            "Unable to connect to the server.";
    }
});
document.addEventListener("mousemove", (event) => {
    document.body.style.setProperty(
        "--mouse-x",
        `${event.clientX}px`
    );

    document.body.style.setProperty(
        "--mouse-y",
        `${event.clientY}px`
    );
});
