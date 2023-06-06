import React from "react";

const ImageGalleryItem = ({ gallery }) => {
  return (
    <ul>
      {gallery.map((photo) => (
        <li key={photo.id}>
          <img key={photo.id} src={photo.webformatURL} alt={photo.tags} width="250" />
        </li>
      ))}
    </ul>
  );
};

export default ImageGalleryItem;
