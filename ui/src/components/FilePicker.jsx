import React, { useState } from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ file, setFile, readFile }) => {
    // 用于显示错误信息的状态
    const [error, setError] = useState('');

    // 文件上传处理函数
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // 检查文件类型是否为图片
        if (selectedFile && !selectedFile.type.startsWith('image/')) {
            setError('仅支持图片文件');
            setFile(''); // 清空文件状态
        } else {
            setError('');
            setFile(selectedFile);
        }
    };

    return (
        <div className="filepicker-container bg-black text-white p-12 rounded-lg shadow-lg max-w-lg mx-auto">
            {/* 文件选择部分 */}
            <div className="flex-1 flex flex-col items-center">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" // 隐藏原始文件选择器
                />
                <label
                    htmlFor="file-upload"
                    className="filepicker-label cursor-pointer text-white text-2xl py-6 px-12 rounded hover: transition transform hover:scale-110 duration-300">
                    上传文件
                </label>

                {/* 显示选择的文件名或错误信息 */}
                <div className={`mt-6 text-xl ${error ? 'text-gray-400' : 'text-white'} max-w-full overflow-hidden text-ellipsis`} style={{ wordBreak: 'break-word' }}>
                    {error ? error : file === '' ? '未选择文件' : file.name}
                </div>
            </div>

            {/* 按钮部分 */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
                <CustomButton
                    type="outline"
                    title="Logo"
                    handleClick={() => readFile('logo')}
                    customStyles="text-xl border-gray-500 text-gray-500 hover:bg-gray-700 hover:text-white px-8 py-4 transition transform hover:scale-110 duration-300"
                />
                <CustomButton
                    type="filled"
                    title="Full"
                    handleClick={() => readFile('full')}
                    customStyles="text-xl bg-gray-500 text-white hover:bg-gray-600 px-8 py-4 transition transform hover:scale-110 duration-300"
                />
            </div>
        </div>
    );
};

export default FilePicker;
