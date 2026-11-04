import React from 'react';

const EventSkeleton = () => {
    return (
        <div className="animate-pulse overflow-hidden rounded-xl border p-4">
            <div className="h-48 rounded-lg bg-gray-200" />

            <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />

            <div className="mt-4 h-10 rounded-lg bg-gray-200" />
        </div>
    );
};

export default EventSkeleton;