document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;

    const data = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    document.getElementById("status").innerText = "Sending...";

    try {
        const response = await fetch("/api/send-mail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById("status").innerText = "Message sent successfully!";
            form.reset();
        } else {
            document.getElementById("status").innerText = "Error sending message.";
        }
    } catch (err) {
        document.getElementById("status").innerText = "Failed to connect.";
    }
});
