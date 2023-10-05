import axios from 'axios';

const API_KEY = '38927636-b5f6066692f15e9e72ed3611e';

// Функция для загрузки изображений по запросу и странице
// export const fetchImg = async (query, page) => {
//   try {
//     const { data } = await axios.get('https://pixabay.com/api/', {
//       params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page,
//         per_page: 12,
//       },
//     });
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// Функция для поиска изображения по запросу и странице
export const findImg = async (query, page) => {
  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 12,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
