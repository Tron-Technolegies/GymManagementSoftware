export const sendWorkoutPlanWhatsApp = (member) => {

    if (!member?.phone) {
        console.log("Phone number not found");
        alert("Member phone number not found.");
        return;
    }

    const phone = String(member.phone)
        .replace(/\D/g, "");

    const message = `Dear ${member.name},

Your AI Workout Plan is ready.
Please find your personalized workout plan attached.
Thank you for choosing GYMPACT.`;

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


    window.open(url, "_blank");
};