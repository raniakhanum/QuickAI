import React from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AITools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  console.log("ICON COMPONENT:", AiToolsData[0].Icon);

  const IconTest = AiToolsData[0].Icon;

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24'>
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className='flex flex-wrap mt-10 justify-center'>
        {AiToolsData.map((tool, index) => {
          const Icon = tool.Icon; 
          return (
            <div
              key={index}
              className='p-8 m-4 w-xs rounded-lg bg-[#F0FDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
              onClick={() => user && navigate(tool.path)}
            >
              {Icon && (
                <div
                  className='w-12 h-12 p-3 rounded-xl flex items-center justify-center'
                  style={{
                    background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`
                  }}
                >
                  <Icon className='w-full h-full text-white' />
                </div>
              )}
              <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
              <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AITools;