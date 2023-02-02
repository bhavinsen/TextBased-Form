    import React, { useState } from 'react';
    import Draggable from 'react-draggable'; // The default

    export default function Form() {
        const [content, setContent] = useState('');

        const handleContentChange = (event) => {
            setContent(event.target.value);
        };

        const handleImport = (event) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setContent(JSON.parse(e.target.result));
            };
            fileReader.readAsText(event.target.files[0]);
        };

        const handleExport = () => {
            const json = JSON.stringify(content);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'form.json';
            link.click();
        };

        const renderContent = () => {
            const lines = content.split('\n');
            return lines.map((line, index) => {
                if (line.startsWith('/headline')) {
                    return (
                        <Draggable key={index}>
                            <h1 className='text-[50px] font-bold'>{line.replace('/headline', '')}</h1>
                        </Draggable>
                    );
                } else if (line.startsWith('/textinput')) {
                    return (
                        <Draggable key={index}>
                            <input placeholder='Type Something...' className='text-[16px] p-3 w-full border border-gray-300 rounded outline-none' type="text" />
                        </Draggable>
                    );
                } else if (line.startsWith('/option')) {
                    return (
                        <Draggable key={index}>
                            <select className='text-[16px] p-3 mt-5 w-full border border-gray-300 rounded outline-non'>
                                <option className='text-[16px]'>Option 1</option>
                                <option className='text-[16px]'>Option 2</option>
                                <option className='text-[16px]'>Option 3</option>
                            </select>
                        </Draggable>
                    );
                }
                else {
                    return (
                        <Draggable key={index}>
                            <p>{line}</p>
                        </Draggable>
                    );
                }
            });
        };

        return (
            <div className='max-w-7xl grid grid-cols-2 gap-5  mx-auto w-full'>
                <div>

                    <h1 className='text-gray-700 font-semibold text-[40px] mb-8'>Text Based Form Editor</h1>

                    <form className='max-w-[500px] flex flex-col items-end gap-5'>
                        <textarea placeholder='Enter Text Here...' value={content} onChange={handleContentChange} className="border px-3  text-[20px] font-medium py-3 border-gray-400 placeholder:text-gray-700 placeholder:text-[18px] rounded min-w-[500px] min-h-[150px] resize-y outline-none focus:outline-none" />

                        <div className='flex gap-3'>
                            <div>

                                <input type="file" id="upload" onChange={handleImport} hidden />
                                <label for="upload" className='p-3 px-6 text-[18px] items-center flex bg-zinc-700 text-white font-semibold rounded-full'><svg className='mr-2.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28">
                                    <g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 16 L16 24 24 16" />
                                    </g>
                                </svg>Choose file</label>
                            </div>

                            <button className='bg-zinc-200  py-2 font-semibold pl-6 pr-6 transition rounded-full text-[18px]  flex items-center fon' onClick={handleExport}>
                                <svg className='mr-2.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28">
                                    <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 16 L16 24 24 16" />
                                    </g>
                                </svg>
                                Export</button>
                        <button className='bg-zinc-700 text-white rounded-full font-semibold hover:text-zinc-900 transition hover:bg-zinc-300 text-[18px] py-2 px-8' type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className='w-full'>
                        {renderContent()}
                    </div>
                </div>
            </div>
        );
    }

