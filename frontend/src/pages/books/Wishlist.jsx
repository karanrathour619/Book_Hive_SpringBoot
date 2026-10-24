import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { removeFromWishlist, clearWishlist } from '../../redux/features/cart/cartSlice'; // Import clearWishlist

const Wishlist = () => {
    const wishlistItems = useSelector(state => state.cart.wishlistItems);
    const dispatch = useDispatch();

    // Function to remove item from wishlist
    const handleRemoveFromWishlist = (product) => {
        dispatch(removeFromWishlist(product));
    };

    // Function to clear entire wishlist
    const handleClearWishlist = () => {
        dispatch(clearWishlist());
    };

    return (
        <>
            <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                        <div className="text-lg font-medium text-gray-900">Wishlist</div>
                        {/* Clear Wishlist Button */}
                        <button
                            onClick={handleClearWishlist}
                            className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                            Clear Wishlist
                        </button>
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">
                            {wishlistItems.length > 0 ? (
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {wishlistItems.map((product) => (
                                        <li key={product?._id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    alt=""
                                                    src={`${getImgUrl(product?.coverImage)}`}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <Link to={`/books/${product._id}`}>{product?.title}</Link>
                                                        </h3>
                                                        <p className="sm:ml-4">${product?.newPrice}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500 capitalize"><strong>Category: </strong>{product?.category}</p>
                                                </div>
                                                <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                    <div className="flex">
                                                        {/* Remove Item Button */}
                                                        <button
                                                            onClick={() => handleRemoveFromWishlist(product)}
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (<p>Your wishlist is empty!</p>)}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to="/">
                            or
                            <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                            >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;
