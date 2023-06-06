

export function fetchGalleryImg(currentName, page) {
  return fetch(
    `https://pixabay.com/api/?q=${currentName}&page=${page}&key=35609158-f7b774b68c2563e05c4bac486&image_type=photo&orientation=horizontal&per_page=20`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}