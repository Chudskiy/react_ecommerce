import axios from "axios";

export const createProduct = async (product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
            headers: {
                authtoken,
            }
        }
    );


// export const getProducts = async () =>
//     await axios.get(`${process.env.REACT_APP_API}/products`);
//
// export const getProduct = async (slug) =>
//     await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
//
// export const removeProduct = async (slug, authtoken) =>
//     await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
//         headers: {
//             authtoken,
//         }
//     });
//
// export const updateCategory = async (slug, category, authtoken) =>
//     await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, category,
//         {
//             headers: {
//                 authtoken,
//             }
//         }
//     );


