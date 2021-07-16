const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('#images');

const uploadPhoto = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

avatarChooser.addEventListener('change', () => {
  uploadPhoto(avatarChooser, avatarPreview);
});

photoChooser.addEventListener('change', () => {
  const img = document.createElement('img');
  const photoPreview = document.querySelector('.ad-form__photo').appendChild(img);

  img.style.width = '100%';
  img.style.height = '100%';
  img.alt = 'Фотография жилья';

  uploadPhoto(photoChooser, photoPreview);
});
