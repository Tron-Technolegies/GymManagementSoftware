export const sendWhatsApp = (member) => {
  if (!member?.phone) {
    console.log("Phone number not found");
    return;
  }

  const phone = String(member.phone).replace(/\D/g, ""); // remove spaces/symbols

  const message = `Dear ${member.name},

Your payment of ₹${member.due_amount} is due on ${member.expiry_date}.

Please make the payment on time.

Thank you for choosing GYMPACT.`;


  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

export const sendPlanExpiryWhatsApp = (member) => {
  if (!member?.phone) {
    console.log("Phone number not found");
    return;
  }

  const phone = String(member.phone).replace(/\D/g, "");

  const message = `Dear ${member.name},

Your ${member.plan?.name || "membership plan"} expired on ${member.expiry_date}.

Please renew your membership on time to continue enjoying our gym services.

Thank you for choosing GYMPACT.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

// export const sendPlanExpiryWhatsApp = (member) => {
//   if (!member?.phone) {
//     console.log("Phone number not found");
//     return;
//   }

//   const phone = String(member.phone).replace(/\D/g, "");

//   const message = `Dear ${member.name},

// Your ${member.plan || "membership"} plan is about to expire on ${member.expiry_date}.

// Please renew your membership on time to continue enjoying our gym services.

// Thank you for choosing GYMPACT.`;

//   const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

//   window.open(url, "_blank");
// };