import React, { useEffect, useState } from 'react'
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';
import { useFetchBookByIdQuery } from '../../../redux/features/books/booksApiRedux';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const { register, handleSubmit, setValue } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
    }
  }, [bookData, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (imageFile) {
        // Send multipart form data with uploaded image
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('trending', data.trending ? "true" : "false");
        formData.append('oldPrice', data.oldPrice);
        formData.append('newPrice', data.newPrice);
        formData.append('coverImage', imageFile);

        await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } else {
        // Send JSON data with image URL
        const updateBookData = {
          title: data.title,
          description: data.description,
          category: data.category,
          trending: data.trending,
          oldPrice: Number(data.oldPrice),
          newPrice: Number(data.newPrice),
          coverImage: data.coverImage || bookData.coverImage,
        };

        await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!"
      });
      await refetch();
    } catch (error) {
      console.error("Failed to update book.", error);
      alert("Failed to update book.");
    }
  };

  if (isLoading) return <Loading />
  if (isError) return <div>Error fetching book data</div>

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Selector: URL input + File picker (identical to AddBook) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL (or upload below)</label>
          <input
            {...register('coverImage')}
            type="text"
            placeholder="e.g. https://... or book-1.png"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow mb-3"
          />
          <label className="block text-xs font-semibold text-gray-500 mb-1">Or Choose Image File from device:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full text-sm" />
          {imageFileName && <p className="text-sm text-green-600 font-medium">Selected: {imageFileName}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook;