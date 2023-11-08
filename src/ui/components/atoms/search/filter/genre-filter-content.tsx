import React from 'react'
import genres from 'utils/mock-genres';
import { useFilterStore } from 'client/store';

export default function GenreContent() {
    const selectedGenres = useFilterStore((state) => state.genres);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            useFilterStore.setState((state) => {
                return { genres: [...state.genres, value] };
            });
        } else {
            useFilterStore.setState((state) => {
                return { genres: state.genres.filter((genre) => genre !== value) };
            });
        }
    };

    return (
        <form >
            <fieldset className="grid grid-cols-2 pl-4 py-4 gap-y-4">
                {genres.map((item, i) => (
                    <div
                        key={i}
                        className='flex  gap-x-[4px]  items-center hover:text-purple-500 hover:translate-x-2 transition	hover:ease-in hover:duration-400'
                    >
                        <input
                            id={`Genre ${item.name}`}
                            type="checkbox"
                            className="rounded-full ring-2 ring-primary-color w-2 h-2  checked:bg-purple-700"
                            value={item.slug}
                            checked={selectedGenres.includes(item.slug)}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`Genre ${item.name}`} className='text-base font-bold cursor-pointer '>
                            {item.name}
                        </label>
                    </div>
                ))}
            </fieldset>
        </form>
    )
}