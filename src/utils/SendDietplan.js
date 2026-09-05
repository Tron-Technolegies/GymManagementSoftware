export const sendDietPlanWhatsApp = (member) => {

    if (!member?.phone) {
        console.log("Phone number not found");
        alert("Member phone number not found.");
        return;
    }

    const phone = String(member.phone)
        .replace(/\D/g, "");

    const message = `Dear ${member.name},

Your AI Diet Plan is ready.
Please find your personalized diet plan attached.
Thank you for choosing GYMPACT.`;


    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
};