// 'use client';

// import image from 'next/image';

// // Interface for image preview data
// interface ImagePreview {
//   file: File;
//   imageUrl: string;
//   previewElement: HTMLDivElement;
// }

// export function handleImageUpload(event: Event) {

//   const onSubmit=()=>{
//     const target = event.target as HTMLInputElement;
//     if (!target.files) return; // Handle no files selected scenario

//     const files = target.files;
//     const rowOfPhotos = document.getElementById(
//       'row-of-product-photos'
//     ) as HTMLDivElement;
//     const maxImages = 4; // Adjust this value as needed

//     let numOfFiles = 0;

//     if (numOfFiles + files.length > maxImages) {
//       alert('You can only upload at most 4 files!');
//       return;
//     }

//     numOfFiles += files.length;

//     const imagePreviews: ImagePreview[] = []; // Array to store image previews

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       if (file) {
//         const reader = new FileReader();
//         reader.onload=(e)=> {
//           if(e.target && e.target.result){
//             const imageURL = e.target.result as string
//           }

//           // const divDocument = document.createElement('div');
//           // const divDocumentClose = document.createElement('div');
//           // const image = document.createElement('img');

//           // divDocument.classList.add('id-document');
//           // divDocumentClose.classList.add('id-document-close');

//           // image.classList.add('image-preview');
//           // image.style.cssText =
//           //   'width: inherit; height: inherit; border-radius: 20px;';
//           // image.src = imageFile.result as string; // Ensure image URL is a string

//           // divDocument.appendChild(divDocumentClose);
//           // divDocument.appendChild(image);

//           // divDocumentClose.addEventListener('click', () => {
//           //   divDocument.style.display = 'none';
//           //   numOfFiles--;
//             const indexToRemove = imagePreviews.findIndex(
//               (preview) => preview.file === file
//             );
//             if (indexToRemove !== -1) {
//               imagePreviews.splice(indexToRemove, 1); // Remove preview data from array
//             }
//           });

//           rowOfPhotos.appendChild(divDocument);

//           imagePreviews.push({
//             file,
//             imageUrl: image.src,
//             previewElement: divDocument,
//           });
//         });

//         reader.readAsDataURL(file);
//       } else {
//         // Handle potential error or invalid file scenario (optional)
//       }

//   }
//   }
//   return(
// <div>
//   <input type="file" multiple style={{display:'none'}} id="addImg1" accept='image/*' onChange={}  />
// </div>
//   )
// }
