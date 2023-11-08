import React, { useEffect, useRef, ChangeEvent } from "react";
import { useFilterStore } from 'client/store';

const RangeSlider = () => {
    const progressRef = useRef<HTMLDivElement>(null);
    const rating = useFilterStore(state => state.rating);
    const handleMin = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        if (newValue >= 0 && newValue < parseInt(rating.max)) {
            useFilterStore.setState((state) => ({
                rating: { ...state.rating, min: newValue.toString() }
            }));
        }
    };

    const handleMax = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        if (newValue > parseInt(rating.min) && newValue <= 100) {
            useFilterStore.setState((state) => ({
                rating: { ...state.rating, max: newValue.toString() }
            }));
        }
    };

    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.left = (parseInt(rating.min) / 100) * 100 + "%";
            progressRef.current.style.right = (1 - parseInt(rating.max) / 100) * 100 + "%";
        }
    }, [rating.min, rating.max]);


    return (
        <div className=" grid place-items-center bg-purple-500">
            <div className="flex flex-col w-full px-4  shadow-xl  bg-bkg-chat">
                <p className="font-semibold text-sm text-primary-color pt-4">
                    Use slider to enter min and max rating
                </p>
                <div className="flex justify-between items-center my-6 ">
                    <div className="rounded-md">
                        <span className="p-2 font-semibold"> Min</span>
                        <input
                            onChange={handleMin}
                            type="number"
                            value={rating.min}
                            className="w-24 rounded-md border border-gray-400 px-2 "
                        />
                    </div>
                    <div className=" rounded-md ">
                        <span className="p-2 font-semibold"> Max</span>
                        <input
                            onChange={handleMax}
                            type="number"
                            value={rating.max}
                            className="w-24 rounded-md border border-gray-400 px-2 "
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative h-1 rounded-md bg-gray-300">
                        <div
                            className=" absolute h-1 bg-purple-500 rounded z- "
                            ref={progressRef}
                        ></div>
                    </div>
                    <div className="relative">
                        <input
                            onChange={handleMin}
                            value={rating.min}
                            type="range"
                            min={0}
                            step={1}
                            max={99}
                            className="absolute w-full h-0 -top-2  appearance-none  "
                        />
                        <input
                            onChange={handleMax}
                            type="range"
                            min={1}
                            step={1}
                            max={100}
                            value={rating.max}
                            className=" absolute w-full h-0 -top-2  appearance-none "
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;
