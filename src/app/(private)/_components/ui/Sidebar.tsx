import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-800 text-white relative">
      <div className='flex justify-center'>
        <div className='flex flex-col items-start w-max gap-5 '>
          <h2 className='text-2xl h-16 flex items-center'>소리상상 강의실</h2>
          <ul className='flex flex-col gap-5'>
            <li>수업자료</li>
            <li>과제</li>
          </ul>
        </div>
      </div>
    </aside >
  );
};

export default Sidebar;