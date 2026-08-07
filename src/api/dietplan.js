import api from "./api";


export const generateDietPlan = (memberId) => {
    return api.post(
        "admin/api/generate-diet/",
        {
            member_id: memberId,
        }
    );
};




// export const uploadDietPDF = (formData) => {

//     return api.post(
//         "admin/api/upload-diet-pdf/",
//         formData,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         }
//     );

// };